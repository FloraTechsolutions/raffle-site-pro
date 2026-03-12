import { useState, useEffect } from "react";
import { ShoppingCart, Zap, Clock, Moon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ProgressBar from "@/components/ProgressBar";
import { EXPRESS_RAFFLES, NIGHTLY_RAFFLES, handleBuy } from "@/lib/data";

const QUICK_AMOUNTS = [10, 20, 50, 100];

/* ── Countdown hook ── */
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s, expired: diff === 0 };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ── Countdown badge ── */
const CountdownBadge = ({ target }: { target: Date }) => {
  const { h, m, s, expired } = useCountdown(target);
  if (expired) return <span className="text-destructive font-black text-xs">ENCERRADO</span>;
  return (
    <span className="font-mono text-primary font-black text-lg tabular-nums">
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
};

/* ── Raffle card (reuses same design from home) ── */
const RaffleCard = ({
  raffle,
  badge,
  badgeIcon: Icon,
  countdown,
}: {
  raffle: (typeof EXPRESS_RAFFLES)[0];
  badge: string;
  badgeIcon: typeof Zap;
  countdown?: Date;
}) => {
  const [qty, setQty] = useState(100);

  return (
    <div className="glass rounded-4xl hover:border-primary/30 transition-all group overflow-hidden flex flex-col">
      <div className="h-56 overflow-hidden relative">
        <img
          src={raffle.img}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={raffle.titulo}
        />
        <div className="absolute top-5 left-5 px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase flex items-center gap-1.5">
          <Icon className="w-3 h-3 text-primary" />
          {badge}
        </div>
      </div>
      <div className="p-8 space-y-6 flex-1 flex flex-col">
        <div className="space-y-2">
          <h4 className="text-2xl font-black uppercase italic tracking-tight">{raffle.titulo}</h4>
          <p className="text-muted-foreground text-xs font-bold uppercase">{raffle.desc}</p>
        </div>

        {/* Countdown */}
        {countdown && (
          <div className="flex items-center gap-3 glass px-5 py-3 rounded-2xl">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase text-muted-foreground">Sorteio em:</span>
            <CountdownBadge target={countdown} />
          </div>
        )}

        <ProgressBar vendidos={raffle.vendidos} total={raffle.total} />

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Cota por</p>
            <p className="text-2xl font-black text-primary">R$ {raffle.preco.toFixed(2).replace(".", ",")}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Total</p>
            <p className="text-lg font-black">
              {(raffle.preco * qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map((val) => (
            <button
              key={val}
              onClick={() => setQty(val)}
              className={`py-2.5 rounded-xl border text-[10px] font-black transition-all ${
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
          onClick={() => handleBuy(raffle, qty)}
          className="mt-auto w-full bg-foreground text-background text-xs font-black uppercase py-4 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Comprar {qty} Cotas
        </button>
      </div>
    </div>
  );
};

/* ── Page ── */
const Sorteios = () => {
  // Express raffles end in ~60 min from now (demo)
  const expressEnd = new Date(Date.now() + 60 * 60 * 1000);

  // Nightly raffles at 21:00 today or tomorrow
  const now = new Date();
  const tonight = new Date(now);
  tonight.setHours(21, 0, 0, 0);
  if (tonight.getTime() <= now.getTime()) tonight.setDate(tonight.getDate() + 1);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-20">
        {/* Express Section */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="p-3 gold-gradient rounded-2xl text-primary-foreground">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
                Rifas <span className="text-primary">Expressas</span>
              </h3>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em]">
                Sorteio em 60 minutos — não perca!
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {EXPRESS_RAFFLES.map((r) => (
              <RaffleCard key={`exp-${r.id}`} raffle={r} badge="Expressa" badgeIcon={Zap} countdown={expressEnd} />
            ))}
          </div>
        </section>

        {/* Nightly Section */}
        <section className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="p-3 glass border-primary/30 border rounded-2xl text-primary">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
                Rifas <span className="text-primary">Noturnas</span>
              </h3>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em]">
                Sorteio toda noite às 21:00h
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {RAFFLES.map((r) => (
              <RaffleCard key={`night-${r.id}`} raffle={r} badge="Noturna" badgeIcon={Moon} countdown={tonight} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
};

export default Sorteios;
