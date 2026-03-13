import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(
      authHeader.replace("Bearer ", "")
    );
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub as string;
    const { raffle_id, quantidade } = await req.json();

    // Validate quantity
    const validAmounts = [10, 20, 30, 50, 100];
    if (!validAmounts.includes(quantidade)) {
      return new Response(
        JSON.stringify({ error: "Quantidade inválida. Escolha: 10, 20, 30, 50 ou 100" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get raffle info
    const { data: raffle, error: raffleError } = await supabase
      .from("raffles")
      .select("*")
      .eq("id", raffle_id)
      .eq("status", "active")
      .single();

    if (raffleError || !raffle) {
      return new Response(
        JSON.stringify({ error: "Rifa não encontrada ou encerrada" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check availability
    const remaining = raffle.total_tickets - raffle.tickets_sold;
    if (remaining < quantidade) {
      return new Response(
        JSON.stringify({ error: `Restam apenas ${remaining} cotas disponíveis` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const valorTotal = quantidade * raffle.ticket_price;

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabase
      .from("ticket_purchases")
      .insert({
        raffle_id,
        user_id: userId,
        quantidade,
        valor_total: valorTotal,
        status: "pending",
      })
      .select()
      .single();

    if (purchaseError) {
      return new Response(
        JSON.stringify({ error: "Erro ao criar pedido" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update tickets sold using service role for atomic update
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await serviceClient
      .from("raffles")
      .update({ tickets_sold: raffle.tickets_sold + quantidade })
      .eq("id", raffle_id);

    return new Response(
      JSON.stringify({
        success: true,
        purchase_id: purchase.id,
        valor_total: valorTotal,
        quantidade,
        raffle_titulo: raffle.titulo,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
