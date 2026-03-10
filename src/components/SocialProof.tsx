import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";

const NAMES = ["João", "Maria", "Pedro", "Letícia", "Fernando", "Beatriz", "Carlos", "Renata"];
const AMOUNTS = [50, 100, 200, 500, 1000];

const SocialProof = () => {
  const [toast, setToast] = useState<{ name: string; amount: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const amount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];
      setToast({ name, amount });
      setTimeout(() => setToast(null), 5000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!toast) return null;

  return (
    <div className="fixed bottom-10 left-10 z-[100] animate-in">
      <div className="glass px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-5 border-l-4 border-primary">
        <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
          <Ticket className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-black uppercase italic">
            {toast.name} <span className="text-primary">comprou {toast.amount} cotas</span>
          </p>
          <p className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-widest">
            Acabou de participar!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
