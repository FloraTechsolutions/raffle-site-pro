import { Crown } from "lucide-react";

const Footer = () => (
  <footer className="pt-32 pb-16 px-6 max-w-7xl mx-auto border-t border-border">
    <div className="grid md:grid-cols-4 gap-12">
      <div className="col-span-2 space-y-6">
        <div className="flex items-center gap-2">
          <div className="gold-gradient p-1.5 rounded-md text-primary-foreground">
            <Crown className="w-4 h-4" />
          </div>
          <h1 className="font-black italic uppercase text-xl">
            Golden<span className="text-primary">Rifa</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-sm max-w-sm font-medium leading-relaxed">
          A maior plataforma de sorteios em dinheiro do Brasil. Transparência total via Loteria Federal e pagamento instantâneo via PIX.
        </p>
      </div>
      <div className="space-y-4">
        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Links Úteis</h5>
        <ul className="text-xs font-bold uppercase text-muted-foreground space-y-3">
          <li><a href="#" className="hover:text-foreground transition-colors">Termos e Condições</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Como Participar</a></li>
          <li><a href="#" className="hover:text-foreground transition-colors">Suporte WhatsApp</a></li>
        </ul>
      </div>
      <div className="space-y-4">
        <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-success">Segurança</h5>
        <p className="text-[8px] text-muted-foreground font-bold uppercase">Conexão Segura SSL 256-bits</p>
        <p className="text-[8px] text-muted-foreground font-bold uppercase">Pagamento via PIX</p>
      </div>
    </div>
    <div className="mt-24 pt-8 border-t border-border text-center">
      <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.6em]">
        © 2026 GoldenRifa - Todos os direitos reservados - +18 Apenas
      </p>
    </div>
  </footer>
);

export default Footer;
