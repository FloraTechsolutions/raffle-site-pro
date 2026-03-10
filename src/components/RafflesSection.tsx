import ProgressBar from "./ProgressBar";
import { RAFFLES, handleBuy } from "@/lib/data";

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
        <div
          key={r.id}
          className="glass rounded-4xl hover:border-primary/30 transition-all group overflow-hidden"
        >
          <div className="h-64 overflow-hidden relative">
            <img
              src={r.img}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt={r.titulo}
            />
            <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase">
              💰 Cash Prize
            </div>
          </div>
          <div className="p-10 space-y-8">
            <div className="space-y-2">
              <h4 className="text-2xl font-black uppercase italic tracking-tight">{r.titulo}</h4>
              <p className="text-muted-foreground text-xs font-bold uppercase">{r.desc}</p>
            </div>
            <ProgressBar vendidos={r.vendidos} total={r.total} />
            <div className="flex justify-between items-end pt-4 border-t border-border">
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Cota</p>
                <p className="text-2xl font-black text-primary">R$ {r.preco.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleBuy(r, 100)}
                className="bg-foreground text-background text-[10px] font-black uppercase px-8 py-4 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default RafflesSection;
