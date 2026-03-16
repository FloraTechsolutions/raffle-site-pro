import { useState } from "react";
import { ShoppingCart, Zap, Clock, Moon, Bitcoin, Loader2, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ProgressBar from "@/components/ProgressBar";
import { useRaffles, type Raffle } from "@/hooks/useRaffles";
import { usePurchase } from "@/hooks/usePurchase";

const QUICK_AMOUNTS = [10, 20, 50, 100];

const RaffleCard = ({
  raffle,
  badge,
  badgeIcon: Icon,
  isCrypto,
}: {
  raffle: Raffle;
  badge: string;
  badgeIcon: typeof Zap;
  isCrypto?: boolean;
}) => {
  const [qty, setQty] = useState(100);
  const { buyTickets, purchasing } = usePurchase();

  return (
    <div className={`glass rounded-3xl sm:rounded-4xl hover:border-primary/30 transition-all group overflow-hidden flex flex-col ${isCrypto ? "border-primary/20" : ""}`}>
      {raffle.image_url && (
        <div className="h-48 sm:h-56 overflow-hidden relative">
          <img
            src={raffle.image_url}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            alt={raffle.titulo}
          />
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3 sm:px-4 py-1.5 glass rounded-full text-[10px] font-black uppercase flex items-center gap-1.5">
            <Icon className="w-3 h-3 text-primary" />
            {badge}
          </div>
          {isCrypto && (
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 px-3 py-1.5 bg-primary/90 text-primary-foreground rounded-full text-[9px] font-black uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Prêmio Cripto
            </div>
          )}
        </div>
      )}
      <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 flex-1 flex flex-col">
        <div className="space-y-2">
          <h4 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight">{raffle.titulo}</h4>
          {raffle.descricao && (
            <p className="text-muted-foreground text-xs font-bold uppercase">{raffle.descricao}</p>
          )}
        </div>

        <ProgressBar vendidos={raffle.tickets_sold} total={raffle.total_tickets} />

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">
              {isCrypto ? "Cota em créditos" : "Cota por"}
            </p>
            <p className="text-xl sm:text-2xl font-black text-primary">
              {Number(raffle.ticket_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Total</p>
            <p className="text-base sm:text-lg font-black">
              {(Number(raffle.ticket_price) * qty).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map((val) => (
            <button
              key={val}
              onClick={() => setQty(val)}
              className={`py-2.5 rounded-xl border text-[10px] font-black transition-all min-h-[44px] ${
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
          className="mt-auto w-full bg-foreground text-background text-xs font-black uppercase py-4 min-h-[48px] rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {purchasing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
          {purchasing ? "Processando..." : `Comprar ${qty} Cotas`}
        </button>
      </div>
    </div>
  );
};

type TabFilter = "all" | "express" | "nightly" | "crypto";

const Sorteios = () => {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const { raffles, loading } = useRaffles();
  const { raffles: cryptoRaffles, loading: loadingCrypto } = useRaffles("crypto");

  const filteredRaffles = activeTab === "all"
    ? raffles
    : raffles.filter((r) => r.tipo === activeTab);

  const allRaffles = activeTab === "crypto" ? cryptoRaffles : filteredRaffles;
  const isLoading = loading || (activeTab === "crypto" && loadingCrypto);

  const tabs: { key: TabFilter; label: string; icon: typeof Zap }[] = [
    { key: "all", label: "Todos", icon: Zap },
    { key: "express", label: "Expressas", icon: Zap },
    { key: "nightly", label: "Noturnas", icon: Moon },
    { key: "crypto", label: "Rifas Cripto", icon: Bitcoin },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
            Todos os <span className="text-primary">Sorteios</span>
          </h2>
          <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.4em]">
            Escolha seu prêmio e concorra agora
          </p>
        </div>

        {/* Tab Filters - horizontally scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap shrink-0 min-h-[44px] ${
                activeTab === tab.key
                  ? "gold-gradient text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Crypto Bonus Banner */}
        {activeTab === "crypto" && (
          <div className="gold-gradient rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex items-center gap-4 animate-fade-up">
            <div className="p-2.5 sm:p-3 bg-primary-foreground/20 rounded-xl sm:rounded-2xl shrink-0">
              <Bitcoin className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>
            <div className="text-primary-foreground">
              <p className="font-black uppercase text-base sm:text-lg">Rifas com Prêmios em Cripto!</p>
              <p className="text-xs sm:text-sm font-medium opacity-90">
                Ganhe Bitcoin, Ethereum e outras criptos. Depósitos em cripto ganham 40% de bônus!
              </p>
            </div>
          </div>
        )}

        {/* Raffles Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : allRaffles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-bold text-lg">Nenhum sorteio ativo nesta categoria.</p>
            <p className="text-muted-foreground text-sm mt-2">Novos sorteios em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {allRaffles.map((r) => (
              <RaffleCard
                key={r.id}
                raffle={r}
                badge={r.tipo === "express" ? "Expressa" : r.tipo === "nightly" ? "Noturna" : "Cripto"}
                badgeIcon={r.tipo === "express" ? Zap : r.tipo === "nightly" ? Moon : Bitcoin}
                isCrypto={r.tipo === "crypto"}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
};

export default Sorteios;
