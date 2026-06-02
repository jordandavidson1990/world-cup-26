export default function EmptyState() {
  return (
    <div className="h-80 flex flex-col items-center justify-center text-fifa-muted border-4 border-dashed border-fifa-border rounded-2xl bg-fifa-input/50 transition-colors duration-300">
      <span className="text-6xl mb-5 opacity-60">⚽</span>
      <p className="uppercase tracking-[0.3em] font-bold text-xs bg-fifa-border/50 px-4 py-2 rounded-full text-fifa-dark transition-colors duration-300">
        Awaiting the Draw
      </p>
    </div>
  );
}
