import { useState, useEffect } from "react";
import { User, Wallet, Key, Bitcoin, CreditCard, Loader2, LogOut, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Profile {
  full_name: string | null;
  wallet_balance: number;
  pix_key: string | null;
  crypto_wallet: string | null;
  telefone: string | null;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, wallet_balance, pix_key, crypto_wallet, telefone")
        .eq("user_id", user.id)
        .maybeSingle();

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();

    // Realtime updates
    const setupRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const channel = supabase
        .channel("dashboard-profile")
        .on("postgres_changes", {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `user_id=eq.${user.id}`,
        }, (payload) => {
          const p = payload.new as any;
          setProfile({
            full_name: p.full_name,
            wallet_balance: p.wallet_balance,
            pix_key: p.pix_key,
            crypto_wallet: p.crypto_wallet,
            telefone: p.telefone,
          });
        })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    };

    setupRealtime();
  }, [navigate]);

  const balance = Number(profile?.wallet_balance || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-40">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">
            Meu <span className="text-primary">Painel</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            Gerencie sua conta, saldo e dados de pagamento.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Name */}
          <div className="glass rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">Nome</span>
            </div>
            <p className="text-lg font-black">{profile?.nome_completo || "—"}</p>
          </div>

          {/* Balance */}
          <div className="glass rounded-3xl p-6 space-y-3 border-primary/20">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">Saldo</span>
            </div>
            <p className="text-2xl font-black text-primary">{balance}</p>
          </div>

          {/* PIX Key */}
          <div className="glass rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Key className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">Chave PIX</span>
            </div>
            <p className="text-sm font-bold truncate">{profile?.pix_key || "Não cadastrada"}</p>
          </div>

          {/* Crypto */}
          <div className="glass rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Bitcoin className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest">Carteira Cripto</span>
            </div>
            <p className="text-sm font-bold truncate">{profile?.crypto_wallet || "Não cadastrada"}</p>
          </div>
        </div>

        {/* Deposit CTA */}
        <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black uppercase italic tracking-tight">
              Depositar <span className="text-primary">Créditos</span>
            </h3>
            <p className="text-muted-foreground text-sm font-medium">
              Adicione saldo à sua carteira via PIX ou Criptomoedas.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase">
              <Bitcoin className="w-3.5 h-3.5" />
              Depósitos em Cripto ganham 40% de bônus!
            </div>
          </div>
          <Link
            to="/depositar"
            className="gold-gradient px-8 py-4 rounded-2xl text-primary-foreground font-black uppercase italic tracking-wider hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 shrink-0"
          >
            <CreditCard className="w-5 h-5" />
            Depositar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to="/sorteios"
            className="glass rounded-3xl p-6 hover:border-primary/30 transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Explorar</p>
              <p className="text-lg font-black">Sorteios Ativos</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
          <Link
            to="/"
            className="glass rounded-3xl p-6 hover:border-primary/30 transition-all group flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Voltar</p>
              <p className="text-lg font-black">Página Inicial</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
