import { useState } from "react";
import { Crown, Key, Wallet, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Onboarding = () => {
  const [pixKey, setPixKey] = useState("");
  const [cryptoWallet, setCryptoWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pixKey.trim()) {
      toast.error("A chave PIX é obrigatória para recebimento de prêmios.");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Sessão expirada. Faça login novamente.");
        navigate("/auth");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id, // Garante o vínculo com o usuário logado
          pix_key: pixKey.trim(),
          crypto_wallet: cryptoWallet.trim() || null,
          onboarding_complete: true,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Cadastro finalizado com sucesso! 🎉");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 blur-[180px] rounded-full" />

      <div className="w-full max-w-lg relative z-10 space-y-8">
        <div className="flex items-center justify-center gap-3">
          <div className="gold-gradient p-3 rounded-2xl text-primary-foreground">
            <Crown className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">
            Golden<span className="text-primary">Rifa</span>
          </h1>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black uppercase italic tracking-tight">
            Finalize seu <span className="text-primary">Cadastro</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            Precisamos dos seus dados de pagamento para enviar seus prêmios.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PIX Key */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Key className="w-3 h-3 text-primary" />
              Chave PIX para Recebimento *
            </label>
            <input
              type="text"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              placeholder="CPF, e-mail, telefone ou chave aleatória"
              className="w-full px-5 py-4 rounded-2xl bg-secondary border border-border text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              required
            />
            <p className="text-[10px] text-muted-foreground">
              Essa chave será usada para enviar seus prêmios via PIX.
            </p>
          </div>

          {/* Crypto Wallet */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Wallet className="w-3 h-3 text-primary" />
              Carteira Cripto (Opcional)
            </label>
            <input
              type="text"
              value={cryptoWallet}
              onChange={(e) => setCryptoWallet(e.target.value)}
              placeholder="Endereço BTC, ETH ou USDT"
              className="w-full px-5 py-4 rounded-2xl bg-secondary border border-border text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            <p className="text-[10px] text-muted-foreground">
              Para recebimento de prêmios em criptomoedas.
            </p>
          </div>

          {/* Crypto Bonus Banner */}
          <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-xl shrink-0">
              <span className="text-2xl">₿</span>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-primary">
                Bônus Cripto de 40%!
              </p>
              <p className="text-[10px] text-muted-foreground font-medium">
                Depósitos em criptomoedas ganham 40% de bônus em créditos na plataforma.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-gradient py-5 rounded-2xl text-primary-foreground font-black uppercase italic tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 pulse-gold disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Finalizar Cadastro
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
