export const DrawLoader = () => (
  <div className="h-96 flex flex-col items-center justify-center relative overflow-hidden rounded-2xl bg-[#0b132b] text-white p-8 border border-fifa-primary">
    <div className="absolute inset-0 bg-fifa-primary/10 animate-pulse"></div>

    <div className="text-6xl mb-6 animate-bounce relative z-10">⚽</div>

    <h3 className="text-xl font-black uppercase tracking-[0.3em] text-fifa-secondary animate-pulse text-center relative z-10">
      Live Draw In Progress
    </h3>
    <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest text-center relative z-10">
      Mixing Pots • Generating Balanced Groups
    </p>

    <div className="w-48 h-1.5 bg-zinc-800 rounded-full mt-6 overflow-hidden relative z-10">
      <div className="h-full bg-fifa-primary w-1/2 rounded-full absolute left-0 animate-pulse"></div>
    </div>
  </div>
);
