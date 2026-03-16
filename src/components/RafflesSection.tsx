import { useState } from "react";
import { ShoppingCart, Zap, Moon, Loader2 } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useRaffles, type Raffle } from "@/hooks/useRaffles";
import { usePurchase } from "@/hooks/usePurchase";

const QUICK_AMOUNTS = [10, 20, 50, 100];

const RaffleCard = ({ raffle }: { raffle: Raffle }) => {
  const [qty, setQty] = useState(100);
  const { buyTickets, purchasing } = usePurchase();

  return (
    <div className="glass rounded-4xl hover:border-primary/30 transition-all group overflow-hidden flex flex-col">
      {raffle.image_url && (
        <div className="h-48 sm:h-56 overflow-hidden relative">
          <img
            src={raffle.image_url}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            alt={raffle.titulo}
          />
          <div className="absolute top-5 left-5 px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase flex items-center gap-1.5">
            {raffle.tipo === "nightly" ? <Moon className="w-3 h-3 text-primary" /> : <Zap className="w-3 h-3 text-primary" />}
            {raffle.tipo === "express" ? "Expressa" : raffle.tipo === "nightly" ? "Noturna" : "Cripto"}
          </div>
        </div>
      )}
      <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col">
        <div className="space-y-2">
          <h4 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight">{raffle.titulo}</h4>
          {raffle.descricao && (
            <p className="text-muted-foreground text-xs font-bold uppercase">{raffle.descricao}</p>
          )}
        </div>

        <ProgressBar vendidos={raffle.tickets_sold} total={raffle.total_tickets} />

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Cota por</p>
            <p className="text-2xl font-black text-primary">
              {Number(raffle.ticket_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Total</p>
            <p className="text-lg font-black">
              {(Number(raffle.ticket_price) * qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
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
          onClick={() => buyTickets(raffle.id, qty)}
          disabled={purchasing}
          className="mt-auto w-full bg-foreground text-background text-xs font-black uppercase py-4 min-h-[44px] rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {purchasing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )}
          {purchasing ? "Processando..." : `Comprar ${qty} Cotas`}
        </button>
      </div>
    </div>
  );
};

const RafflesSection = () => {
  const { raffles, loading } = useRaffles();

  return (
    <section id="rifas" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12 sm:space-y-16">
      <div className="text-center space-y-4">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
          Escolha seu <span className="text-primary">Prêmio</span>
        </h3>
        <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.4em]">
          Sorteios ativos em tempo real
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : raffles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground font-bold text-lg">Nenhum sorteio ativo no momento.</p>
          <p className="text-muted-foreground text-sm mt-2">Novos sorteios em breve!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {raffles.map((r) => (
            <RaffleCard key={r.id} raffle={r} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RafflesSection;
