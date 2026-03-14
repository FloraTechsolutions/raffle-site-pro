import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Raffle = Tables<"raffles">;

export const useRaffles = (tipo?: "express" | "nightly") => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRaffles = async () => {
    let query = supabase
      .from("raffles")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (tipo) query = query.eq("tipo", tipo);

    const { data } = await query;
    setRaffles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRaffles();

    // Realtime subscription for raffles updates
    const channel = supabase
      .channel("raffles-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "raffles" },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            setRaffles((prev) =>
              prev.map((r) =>
                r.id === (payload.new as Raffle).id ? (payload.new as Raffle) : r
              )
            );
          } else if (payload.eventType === "INSERT") {
            const newRaffle = payload.new as Raffle;
            if (newRaffle.status === "active" && (!tipo || newRaffle.tipo === tipo)) {
              setRaffles((prev) => [newRaffle, ...prev]);
            }
          } else if (payload.eventType === "DELETE") {
            setRaffles((prev) => prev.filter((r) => r.id !== (payload.old as any).id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tipo]);

  return { raffles, loading, refetch: fetchRaffles };
};
