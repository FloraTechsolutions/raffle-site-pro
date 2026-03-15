import { useState } from "react";
import { Crown, Mail, Lock, Phone, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formatWhatsApp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Login realizado com sucesso!");

        // Check if onboarding is complete
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("onboarding_complete")
            .eq("user_id", user.id)
            .maybeSingle();

          if (profile && !profile.onboarding_complete) {
            navigate("/onboarding");
            return;
          }
        }
        navigate("/");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { nome_completo: nomeCompleto, telefone: whatsapp },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;

        if (data.user) {
          await supabase.from("profiles").upsert({
            user_id: data.user.id,
            nome_completo: nomeCompleto,
            telefone: whatsapp,
            saldo_carteira: 0,
          }, { onConflict: "user_id" });
        }

        toast.success("Conta criada! Redirecionando para finalizar cadastro...");
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro na autenticação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-md text-center space-y-8 p-12">
          <div className="inline-flex items-center gap-3">
            <div className="gold-gradient p-4 rounded-2xl text-primary-foreground">
              <Crown className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">
              Golden<span className="text-primary">Rifa</span>
            </h1>
          </div>
          <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-tight">
            Dinheiro no bolso em <span className="text-primary">segundos.</span>
          </h2>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed">
            Escolha o seu prêmio, adquira suas cotas e concorra através da Loteria Federal.
          </p>
          <div className="flex items-center justify-center gap-6 text-muted-foreground text-xs font-bold uppercase tracking-widest">
            <span>🔒 100% Seguro</span>
            <span>⚡ PIX Instantâneo</span>
            <span>₿ Cripto Aceito</span>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
            <div className="gold-gradient p-2 rounded-lg text-primary-foreground">
              <Crown className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase">
              Golden<span className="text-primary">Rifa</span>
            </h1>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-3xl font-black uppercase italic tracking-tight">
              {isLogin ? "Entrar" : "Criar Conta"}
            </h3>
            <p className="text-muted-foreground text-sm font-medium">
              {isLogin
                ? "Acesse sua conta e confira seus números"
                : "Cadastre-se e comece a concorrer agora"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 glass rounded-2xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`py-3 rounded-xl text-xs font-black uppercase transition-all ${
                isLogin ? "gold-gradient text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`py-3 rounded-xl text-xs font-black uppercase transition-all ${
                !isLogin ? "gold-gradient text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Registro
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2 animate-fade-up">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary border border-border text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary border border-border text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-fade-up">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                    placeholder="(11) 99999-9999"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary border border-border text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-secondary border border-border text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs font-bold text-primary hover:underline">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient py-5 rounded-2xl text-primary-foreground font-black uppercase italic tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 pulse-gold disabled:opacity-50"
            >
              {loading ? "Aguarde..." : isLogin ? "Entrar" : "Criar Conta"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            {isLogin ? "Não tem conta? " : "Já tem conta? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-bold hover:underline"
            >
              {isLogin ? "Cadastre-se" : "Faça login"}
            </button>
          </p>

          <Link
            to="/"
            className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-wider"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
