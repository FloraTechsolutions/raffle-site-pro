import { useState } from "react";
import { DollarSign, Trophy, Loader2 } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useRaffles } from "@/hooks/useRaffles";
import { usePurchase } from "@/hooks/usePurchase";
import heroImage from "@/assets/hero-trophy.png";

const HeroSection = () => {
  const [qty, setQty] = useState(100);
  const { raffles, loading } = useRaffles();
  const { buyTickets, purchasing } = usePurchase();
  const raffle = raffles[0];

  return (
    <header className="pt-40 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8 animate-in">
        <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary-foreground">
            Pagamentos via PIX Automático
          </span>
        </div>

        <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85]">
          Dinheiro no <br /> bolso em <br />
          <span className="text-primary">segundos.</span>
        </h2>

        <p className="text-muted-foreground text-lg max-w-md font-medium leading-relaxed">
          Escolha o seu prêmio, adquira suas cotas e concorra através da Loteria Federal. O prêmio cai na conta assim que o sorteio é realizado.
        </p>

        {loading ? (
          <div className="glass-card p-8 rounded-[2.5rem] flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : raffle ? (
          <div className="glass-card p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <DollarSign className="w-32 h-32" />
            </div>
            <div className="relative space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Destaque do Momento</p>
                  <h3 className="text-3xl font-black italic uppercase">{raffle.titulo}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Cota por</p>
                  <p className="text-3xl font-black">R$ {Number(raffle.ticket_price).toFixed(2)}</p>
                </div>
              </div>

              <ProgressBar vendidos={raffle.tickets_sold} total={raffle.total_tickets} />

              <div className="grid grid-cols-4 gap-3">
                {[100, 500, 1000, 5000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setQty(val)}
                    className={`py-4 rounded-2xl border text-xs font-black transition-all ${
                      qty === val
                        ? "gold-gradient border-primary text-primary-foreground"
                        : "bg-secondary border-border hover:border-muted-foreground"
                    }`}
                  >
                    +{val}
                  </button>
                ))}
              </div>

              <button
                onClick={() => buyTickets(raffle.id, qty)}
                disabled={purchasing}
                className="w-full gold-gradient py-6 rounded-2xl text-primary-foreground font-black uppercase italic tracking-widest hover:scale-[1.02] active:scale-95 transition-all pulse-gold disabled:opacity-50"
              >
                {purchasing ? "Processando..." : "Garantir Minha Sorte"}
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-8 rounded-[2.5rem] text-center">
            <p className="text-muted-foreground font-bold">Nenhum sorteio ativo no momento.</p>
          </div>
        )}
      </div>

      <div className="hidden lg:block relative">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />
        <div className="relative glass p-6 rounded-4xl">
          <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden relative">
            <img src={heroImage} className="w-full h-full object-cover" alt="Troféu dourado com moedas" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-12 left-10 right-10 p-8 glass rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/20 text-success rounded-2xl">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase">Último Ganhador do Site</p>
                  <p className="text-xl font-black uppercase italic">Ricardo F. - R$ 15.000,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
