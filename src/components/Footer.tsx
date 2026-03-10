import { Crown, Shield, Lock } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/data";

const Footer = () => {
  const handleSupport = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Preciso de suporte.")}`, "_blank");
  };

  return (
    <footer className="pt-32 pb-16 px-6 max-w-7xl mx-auto border-t border-border">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="gold-gradient p-1.5 rounded-md text-primary-foreground">
              <Crown className="w-4 h-4" />
            </div>
            <h2 className="font-black italic uppercase text-xl">
              Golden<span className="text-primary">Rifa</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm font-medium leading-relaxed">
            A maior plataforma de sorteios em dinheiro do Brasil. Transparência total via Loteria Federal e pagamento instantâneo via PIX.
          </p>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full border border-border">
              <Shield className="w-3.5 h-3.5 text-success" />
              <span className="text-[9px] font-black uppercase text-muted-foreground">SSL Seguro</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full border border-border">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] font-black uppercase text-muted-foreground">PIX Verificado</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Links Úteis</h5>
          <ul className="text-xs font-bold uppercase text-muted-foreground space-y-3">
            <li>
              <a href="#rifas" className="hover:text-foreground transition-colors">Sorteios Ativos</a>
            </li>
            <li>
              <a href="#ranking" className="hover:text-foreground transition-colors">Ranking de Compradores</a>
            </li>
            <li>
              <a href="#ganhadores" className="hover:text-foreground transition-colors">Últimos Ganhadores</a>
            </li>
            <li>
              <button onClick={handleSupport} className="hover:text-foreground transition-colors">
                Suporte WhatsApp
              </button>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-success">Como Funciona</h5>
          <ul className="text-xs font-bold text-muted-foreground space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-primary font-black">1.</span> Escolha o sorteio
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-black">2.</span> Compre suas cotas via PIX
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-black">3.</span> Aguarde o resultado da Loteria Federal
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-black">4.</span> Prêmio cai na conta via PIX!
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-24 pt-8 border-t border-border text-center">
        <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.6em]">
          © 2026 GoldenRifa — Todos os direitos reservados — +18 Apenas
        </p>
      </div>
    </footer>
  );
};

export default Footer;
