
-- Add PIX key and crypto wallet to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS pix_key text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS crypto_wallet text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_complete boolean NOT NULL DEFAULT false;

-- Add 'crypto' to raffle_type enum
ALTER TYPE public.raffle_type ADD VALUE IF NOT EXISTS 'crypto';
