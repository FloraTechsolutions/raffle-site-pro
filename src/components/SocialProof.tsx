import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";

const NAMES = ["Gabriel Silva", "Lucas Oliveira", "Matheus Santos", "Pedro Henrique Costa", "Guilherme Souza", "Felipe Rodrigues", "João Pedro Ferreira", "Rafael Alves", "Vitor Pereira", "Thiago Lima", "Bruno Gomes", "Nicolas Ribeiro", "Samuel Carvalho", "Daniel Martins", "Gustavo Rocha", "Leonardo Mendes", "Eduardo Freitas", "Diego Barbosa", "Rodrigo Cardoso", "Arthur Teixeira", "Ana Beatriz Silva", "Maria Eduarda Santos", "Julia Oliveira", "Alice Souza", "Sofia Rodrigues", "Beatriz Ferreira", "Mariana Alves", "Larissa Pereira", "Camila Lima", "Letícia Gomes", "Amanda Ribeiro", "Yasmin Carvalho", "Bruna Martins", "Isabela Rocha", "Fernanda Mendes", "Caroline Freitas", "Gabriela Barbosa", "Vitória Cardoso", "Marina Teixeira", "Luana Melo", "André Luiz Castro", "Ricardo Vieira", "Marcos Vinícius", "Fernando Machado", "Caio Antunes", "Patrícia Sales", "Renata Guimarães", "Tatiane Ramos", "Priscila Moraes", "Vanessa Borges"];
const AMOUNTS = [10, 20, 30, 50, 100];

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
