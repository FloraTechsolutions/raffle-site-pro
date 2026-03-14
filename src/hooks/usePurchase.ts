import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const usePurchase = () => {
  const [purchasing, setPurchasing] = useState(false);
  const navigate = useNavigate();

  const buyTickets = async (raffleId: string, quantidade: number) => {
    // Check auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Faça login para comprar cotas!");
      navigate("/auth");
      return null;
    }

    setPurchasing(true);
    try {
      const { data, error } = await supabase.rpc("process_ticket_purchase", {
        p_user_id: user.id,
        p_raffle_id: raffleId,
        p_quantidade: quantidade,
      });

      if (error) {
        toast.error("Erro ao processar compra. Tente novamente.");
        return null;
      }

      const result = data as any;
      if (!result?.success) {
        const errorMsg = result?.error || "Erro na compra";
        toast.error(errorMsg);
        if (errorMsg === "Saldo insuficiente") {
          toast("💰 Adicione saldo à sua carteira para continuar.", {
            action: {
              label: "Adicionar Saldo",
              onClick: () => toast.info("Funcionalidade de depósito em breve!"),
            },
          });
        }
        return null;
      }

      toast.success(
        `✅ ${result.quantidade} cotas compradas com sucesso! Novo saldo: ${Number(result.novo_saldo).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
      );
      return result;
    } catch {
      toast.error("Erro inesperado. Tente novamente.");
      return null;
    } finally {
      setPurchasing(false);
    }
  };

  return { buyTickets, purchasing };
};
