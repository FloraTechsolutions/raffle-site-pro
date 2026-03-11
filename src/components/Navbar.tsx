import { useState } from "react";
import { Crown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { WHATSAPP_NUMBER } from "@/lib/data";

const NAV_LINKS = [
  { href: "/sorteios", label: "Sorteios" },
  { href: "/#ranking", label: "Ranking" },
  { href: "/#ganhadores", label: "Ganhadores" },
  { href: "/faq", label: "Ajuda" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleMeusNumeros = () => {
    const text = "Olá! Gostaria de consultar meus números na GoldenRifa.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const isHash = (href: string) => href.startsWith("/#");

  const renderLink = (l: typeof NAV_LINKS[0], onClick?: () => void, className?: string) => {
    if (isHash(l.href)) {
      // If we're on home, use anchor. Otherwise link to home + hash
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

        {/* Desktop */}
        <div className="hidden md:flex gap-8 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
          {NAV_LINKS.map((l) =>
            renderLink(l, undefined, "hover:text-primary transition-colors")
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="hidden md:block bg-secondary border border-border px-5 py-2 rounded-full text-[10px] font-black uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            Meus Números
          </Link>

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
          <Link
            to="/auth"
            onClick={() => setOpen(false)}
            className="block w-full gold-gradient py-3 rounded-xl text-primary-foreground font-black uppercase text-xs mt-2 text-center"
          >
            Meus Números
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
