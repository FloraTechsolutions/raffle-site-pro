import { Trophy, Award, DollarSign } from "lucide-react";
import { RANKING, WINNERS } from "@/lib/data";

const RankingWinnersSection = () => (
  <section className="bg-secondary/50 py-32 border-y border-border">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
      {/* Ranking */}
      <div id="ranking" className="space-y-10">
        <div className="flex items-center gap-5">
          <div className="p-4 gold-gradient rounded-3xl text-primary-foreground">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase italic">Top Compradores</h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Recompensas para os maiores do mês
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {RANKING.map((u, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-6 rounded-3xl glass hover:bg-secondary transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary font-black text-sm border border-border">
                  {u.avatar}
                </div>
                <div>
                  <p className="font-black uppercase italic text-lg">{u.nome}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Posição {i + 1} no Ranking
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-primary">{u.cotas}</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase">Cotas</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ganhadores */}
      <div id="ganhadores" className="space-y-10">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-success rounded-3xl text-success-foreground">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-black uppercase italic text-success">Ganhadores</h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Dinheiro pago na hora
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {WINNERS.map((w, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] glass-card space-y-5">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-muted-foreground uppercase bg-secondary px-3 py-1 rounded-full">
                  {w.data}
                </span>
                <div className="text-success">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-xl font-black italic uppercase mb-1">{w.nome}</p>
                <p className="text-2xl font-black text-success">{w.premio}</p>
              </div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase italic truncate">
                {w.rifa}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default RankingWinnersSection;
