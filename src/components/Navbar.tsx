import { useState } from "react";
import { Crown, Menu, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/data";

const NAV_LINKS = [
  { href: "#rifas", label: "Sorteios" },
  { href: "#ranking", label: "Ranking" },
  { href: "#ganhadores", label: "Ganhadores" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleMeusNumeros = () => {
    const text = "Olá! Gostaria de consultar meus números na GoldenRifa.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="gold-gradient p-2 rounded-lg text-primary-foreground">
            <Crown className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">
            Golden<span className="text-primary">Rifa</span>
          </h1>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleMeusNumeros}
            className="hidden md:block bg-secondary border border-border px-5 py-2 rounded-full text-[10px] font-black uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            Meus Números
          </button>

          {/* Mobile toggle */}
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
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-black uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors py-2"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { handleMeusNumeros(); setOpen(false); }}
            className="w-full gold-gradient py-3 rounded-xl text-primary-foreground font-black uppercase text-xs mt-2"
          >
            Meus Números
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
