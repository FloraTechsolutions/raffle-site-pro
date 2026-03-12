import { useState } from "react";
import { ShoppingCart, Zap } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { RAFFLES, handleBuy } from "@/lib/data";

const QUICK_AMOUNTS = [10, 20, 50, 100];

const RaffleCard = ({ raffle }: { raffle: typeof RAFFLES[0] }) => {
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
          <Zap className="w-3 h-3 text-primary" />
          Cash Prize
        </div>
      </div>
      <div className="p-8 space-y-6 flex-1 flex flex-col">
        <div className="space-y-2">
          <h4 className="text-2xl font-black uppercase italic tracking-tight">{raffle.titulo}</h4>
          <p className="text-muted-foreground text-xs font-bold uppercase">{raffle.desc}</p>
        </div>

        <ProgressBar vendidos={raffle.vendidos} total={raffle.total} />

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Cota por</p>
            <p className="text-2xl font-black text-primary">
              R$ {raffle.preco.toFixed(2).replace(".", ",")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Total</p>
            <p className="text-lg font-black">
              {(raffle.preco * qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>

        {/* Qty selector */}
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

const RafflesSection = () => (
  <section id="rifas" className="max-w-7xl mx-auto px-6 py-24 space-y-16">
    <div className="text-center space-y-4">
      <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
        Escolha seu <span className="text-primary">Prêmio</span>
      </h3>
      <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.4em]">
        Sorteios ativos em tempo real
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {RAFFLES.map((r) => (
        <RaffleCard key={r.id} raffle={r} />
      ))}
    </div>
  </section>
);

export default RafflesSection;
