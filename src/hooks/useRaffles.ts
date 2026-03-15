import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Raffle {
  id: string;
  titulo: string;
  descricao: string | null;
  image_url: string | null;
  ticket_price: number;
  total_tickets: number;
  tickets_sold: number;
  prize_value: number;
  status: string;
  tipo: string;
  created_at: string;
  draw_date: string | null;
  updated_at: string;
}

export const useRaffles = (tipo?: "express" | "nightly" | "crypto") => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRaffles = async () => {
    try {
      // Fetch all raffles without strict status filter to avoid empty results
      let query = supabase
        .from("raffles")
        .select("*")
        .order("created_at", { ascending: false });

      if (tipo) query = query.eq("tipo", tipo);

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching raffles:", error);
        setRaffles([]);
      } else {
        // Filter active on the client side for resilience
        const activeRaffles = (data || []).filter(
          (r: any) => r.status === "active"
        ) as Raffle[];
        setRaffles(activeRaffles);
      }
    } catch (err) {
      console.error("Unexpected error fetching raffles:", err);
      setRaffles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRaffles();

    const channel = supabase
      .channel(`raffles-realtime-${tipo || "all"}`)
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
