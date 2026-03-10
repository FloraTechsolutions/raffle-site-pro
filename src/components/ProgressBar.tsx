interface ProgressBarProps {
  vendidos: number;
  total: number;
}

const ProgressBar = ({ vendidos, total }: ProgressBarProps) => {
  const pct = (vendidos / total) * 100;
  const isConfirmed = pct >= 90;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span className="text-muted-foreground">{pct.toFixed(1)}% Vendido</span>
        <span className={isConfirmed ? "text-success" : "text-primary"}>
          {isConfirmed ? "SORTEIO CONFIRMADO" : "META: 90%"}
        </span>
      </div>
      <div className="h-2.5 bg-background rounded-full border border-border overflow-hidden p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isConfirmed ? "bg-success shadow-[0_0_10px_hsl(var(--success)/0.5)]" : "bg-primary"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
