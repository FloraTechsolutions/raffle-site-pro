import { Crown } from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass border-b border-border px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="gold-gradient p-2 rounded-lg text-primary-foreground">
          <Crown className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-black italic tracking-tighter uppercase">
          Golden<span className="text-primary">Rifa</span>
        </h1>
      </div>
      <div className="hidden md:flex gap-8 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
        <a href="#rifas" className="hover:text-primary transition-colors">Sorteios</a>
        <a href="#ranking" className="hover:text-primary transition-colors">Ranking</a>
        <a href="#ganhadores" className="hover:text-primary transition-colors">Ganhadores</a>
      </div>
      <button className="bg-secondary border border-border px-5 py-2 rounded-full text-[10px] font-black uppercase hover:bg-muted transition-all">
        Meus Números
      </button>
    </div>
  </nav>
);

export default Navbar;
