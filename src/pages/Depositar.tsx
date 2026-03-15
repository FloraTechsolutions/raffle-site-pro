import { useState } from "react";
import { QrCode, Bitcoin, ArrowRight, Copy, Check, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const DEPOSIT_OPTIONS = [
  { value: 20, label: "R$ 20" },
  { value: 50, label: "R$ 50" },
  { value: 100, label: "R$ 100" },
  { value: 200, label: "R$ 200" },
  { value: 500, label: "R$ 500" },
  { value: 1000, label: "R$ 1.000" },
];

const Depositar = () => {
  const [method, setMethod] = useState<"pix" | "crypto">("pix");
  const [amount, setAmount] = useState(100);
  const [copied, setCopied] = useState(false);

  const bonusAmount = method === "crypto" ? Math.floor(amount * 0.4) : 0;
  const totalCredits = amount + bonusAmount;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto space-y-10">
        <div className="space-y-2">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">
            Depositar <span className="text-primary">Créditos</span>
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            Escolha o método de depósito e o valor desejado.
          </p>
        </div>

        {/* Method Toggle */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMethod("pix")}
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
              method === "pix"
                ? "border-primary bg-primary/5"
                : "border-border bg-secondary hover:border-muted-foreground"
            }`}
          >
            <QrCode className={`w-8 h-8 ${method === "pix" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="text-sm font-black uppercase">PIX</span>
            <span className="text-[10px] text-muted-foreground font-bold">Crédito instantâneo</span>
          </button>

          <button
            onClick={() => setMethod("crypto")}
            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
              method === "crypto"
                ? "border-primary bg-primary/5"
                : "border-border bg-secondary hover:border-muted-foreground"
            }`}
          >
            {/* Bonus badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-[9px] font-black uppercase">
              <Sparkles className="w-3 h-3" />
              +40% Bônus
            </div>
            <Bitcoin className={`w-8 h-8 ${method === "crypto" ? "text-primary" : "text-muted-foreground"}`} />
            <span className="text-sm font-black uppercase">Criptomoedas</span>
            <span className="text-[10px] text-muted-foreground font-bold">BTC, ETH, USDT</span>
          </button>
        </div>

        {/* Crypto Bonus Banner */}
        {method === "crypto" && (
          <div className="gold-gradient rounded-3xl p-6 text-primary-foreground animate-fade-up">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-foreground/20 rounded-2xl">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black uppercase text-lg">Bônus Exclusivo de 40%!</p>
                <p className="text-sm font-medium opacity-90">
                  Deposite R$ {amount.toLocaleString("pt-BR")} e receba R$ {totalCredits.toLocaleString("pt-BR")} em créditos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Amount Selection */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Valor do Depósito
          </label>
          <div className="grid grid-cols-3 gap-3">
            {DEPOSIT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAmount(opt.value)}
                className={`py-4 rounded-2xl border text-sm font-black transition-all ${
                  amount === opt.value
                    ? "gold-gradient border-primary text-primary-foreground"
                    : "bg-secondary border-border hover:border-muted-foreground text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="glass rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground font-bold">Valor do depósito</span>
            <span className="font-black">R$ {amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
          </div>
          {bonusAmount > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-primary font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Bônus Cripto (40%)
              </span>
              <span className="font-black text-primary">+ R$ {bonusAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          <div className="border-t border-border pt-4 flex justify-between items-center">
            <span className="text-muted-foreground font-black uppercase text-xs">Total em Créditos</span>
            <span className="text-2xl font-black text-primary">
              R$ {totalCredits.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="glass rounded-3xl p-8 space-y-6 text-center">
          {method === "pix" ? (
            <>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Copie o código PIX abaixo
              </p>
              <div className="bg-secondary rounded-2xl p-6 font-mono text-xs text-muted-foreground break-all select-all">
                00020126580014br.gov.bcb.pix0136goldenrifa-deposito-{amount}
              </div>
              <button
                onClick={() => handleCopy(`00020126580014br.gov.bcb.pix0136goldenrifa-deposito-${amount}`)}
                className="gold-gradient px-8 py-4 rounded-2xl text-primary-foreground font-black uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? "Copiado!" : "Copiar Código PIX"}
              </button>
            </>
          ) : (
            <>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Envie para o endereço abaixo
              </p>
              <div className="space-y-4">
                <div className="bg-secondary rounded-2xl p-4 text-left">
                  <p className="text-[10px] font-black text-primary uppercase mb-1">Bitcoin (BTC)</p>
                  <p className="font-mono text-xs text-muted-foreground break-all">bc1qgoldenrifa...placeholder</p>
                </div>
                <div className="bg-secondary rounded-2xl p-4 text-left">
                  <p className="text-[10px] font-black text-primary uppercase mb-1">USDT (TRC-20)</p>
                  <p className="font-mono text-xs text-muted-foreground break-all">TGoldenRifa...placeholder</p>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground font-bold">
                Após enviar, o saldo será creditado automaticamente com o bônus de 40%.
              </p>
            </>
          )}
        </div>

        <Link
          to="/dashboard"
          className="block text-center text-xs text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-wider"
        >
          ← Voltar ao Painel
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Depositar;
