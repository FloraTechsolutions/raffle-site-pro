import { useState, useEffect } from "react";
import { Crown, Menu, X, LogOut, Wallet } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_NUMBER } from "@/lib/data";
import type { User } from "@supabase/supabase-js";

const NAV_LINKS = [
  { href: "/sorteios", label: "Sorteios" },
  { href: "/#ranking", label: "Ranking" },
  { href: "/#ganhadores", label: "Ganhadores" },
  { href: "/faq", label: "Ajuda" },
];

interface Profile {
  nome_completo: string | null;
  saldo_carteira: number;
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch profile data
  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("nome_completo, saldo_carteira")
      .eq("user_id", userId)
      .maybeSingle();
    setProfile(data);
  };

  useEffect(() => {
    // Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    // Then get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    navigate("/");
  };

  const firstName = profile?.nome_completo?.split(" ")[0] || "Usuário";
  const balance = Number(profile?.saldo_carteira || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const isHash = (href: string) => href.startsWith("/#");

  const renderLink = (l: typeof NAV_LINKS[0], onClick?: () => void, className?: string) => {
    if (isHash(l.href)) {
      const target = location.pathname === "/" ? l.href.replace("/", "") : l.href;
      return (
        <a key={l.href} href={target} onClick={onClick} className={className}>
          {l.label}
        </a>
      );
    }
    return (
      <Link key={l.href} to={l.href} onClick={onClick} className={className}>
        {l.label}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="gold-gradient p-2 rounded-lg text-primary-foreground">
            <Crown className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">
            Golden<span className="text-primary">Rifa</span>
          </h1>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
          {NAV_LINKS.map((l) =>
            renderLink(l, undefined, "hover:text-primary transition-colors")
          )}
        </div>

        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                /* Authenticated UI */
                <div className="hidden md:flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    <Wallet className="w-4 h-4 text-primary" />
                    <span>{balance}</span>
                  </div>
                  <span className="text-xs font-bold text-foreground">
                    Olá, <span className="text-primary">{firstName}</span>
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 bg-secondary border border-border px-4 py-2 rounded-full text-[10px] font-black uppercase hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
                  >
                    <LogOut className="w-3 h-3" />
                    Sair
                  </button>
                </div>
              ) : (
                /* Unauthenticated UI */
                <Link
                  to="/auth"
                  className="hidden md:block bg-secondary border border-border px-5 py-2 rounded-full text-[10px] font-black uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  Meus Números / Login
                </Link>
              )}
            </>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 space-y-3 animate-fade-up">
          {NAV_LINKS.map((l) =>
            renderLink(
              l,
              () => setOpen(false),
              "block text-sm font-black uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors py-2"
            )
          )}

          {!loading && (
            <>
              {user ? (
                <div className="space-y-3 pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">
                      Olá, <span className="text-primary">{firstName}</span>
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                      <Wallet className="w-3.5 h-3.5 text-primary" />
                      {balance}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setOpen(false);
                    }}
                    className="block w-full py-3 rounded-xl border border-border text-center text-xs font-black uppercase text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-all"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="block w-full gold-gradient py-3 rounded-xl text-primary-foreground font-black uppercase text-xs mt-2 text-center"
                >
                  Meus Números / Login
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
