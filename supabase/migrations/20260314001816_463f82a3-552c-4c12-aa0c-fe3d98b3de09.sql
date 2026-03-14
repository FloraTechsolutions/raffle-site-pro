
-- Create atomic purchase function using wallet balance
CREATE OR REPLACE FUNCTION public.process_ticket_purchase(
  p_user_id uuid,
  p_raffle_id uuid,
  p_quantidade integer
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_raffle raffles%ROWTYPE;
  v_valor_total numeric;
  v_saldo numeric;
  v_remaining integer;
  v_purchase_id uuid;
BEGIN
  -- Lock raffle row to prevent race conditions
  SELECT * INTO v_raffle FROM raffles WHERE id = p_raffle_id AND status = 'active' FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Rifa não encontrada ou encerrada');
  END IF;

  -- Check availability
  v_remaining := v_raffle.total_tickets - v_raffle.tickets_sold;
  IF v_remaining < p_quantidade THEN
    RETURN jsonb_build_object('success', false, 'error', format('Restam apenas %s cotas disponíveis', v_remaining));
  END IF;

  -- Calculate total
  v_valor_total := p_quantidade * v_raffle.ticket_price;

  -- Lock and check user balance
  SELECT saldo_carteira INTO v_saldo FROM profiles WHERE user_id = p_user_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Perfil não encontrado');
  END IF;

  IF v_saldo < v_valor_total THEN
    RETURN jsonb_build_object('success', false, 'error', 'Saldo insuficiente', 'saldo_atual', v_saldo, 'valor_necessario', v_valor_total);
  END IF;

  -- Deduct balance
  UPDATE profiles SET saldo_carteira = saldo_carteira - v_valor_total WHERE user_id = p_user_id;

  -- Increment tickets sold
  UPDATE raffles SET tickets_sold = tickets_sold + p_quantidade WHERE id = p_raffle_id;

  -- Create purchase record
  INSERT INTO ticket_purchases (raffle_id, user_id, quantidade, valor_total, status, paid_at)
  VALUES (p_raffle_id, p_user_id, p_quantidade, v_valor_total, 'paid', now())
  RETURNING id INTO v_purchase_id;

  RETURN jsonb_build_object(
    'success', true,
    'purchase_id', v_purchase_id,
    'valor_total', v_valor_total,
    'novo_saldo', v_saldo - v_valor_total,
    'quantidade', p_quantidade,
    'raffle_titulo', v_raffle.titulo
  );
END;
$$;

-- Enable realtime on raffles and profiles
ALTER PUBLICATION supabase_realtime ADD TABLE public.raffles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
