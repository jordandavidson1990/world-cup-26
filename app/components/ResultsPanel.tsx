import { SweepstakeResult } from "../types";

interface ResultsPanelProps {
  results: SweepstakeResult[];
  isDrawing: boolean;
}

export default function ResultsPanel({
  results,
  isDrawing,
}: ResultsPanelProps) {
  return (
    <section className="bg-fifa-card p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-fifa-border min-h-[500px] transition-colors duration-300 relative">
      {/* Panel Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-fifa-input rounded-xl flex items-center justify-center text-2xl shadow-inner transition-colors duration-300">
          🌍
        </div>
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-fifa-dark transition-colors duration-300">
          Final Group Allocations
        </h2>
      </div>

      {isDrawing ? (
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
      ) : results.length === 0 ? (
        <div className="h-80 flex flex-col items-center justify-center text-fifa-muted border-4 border-dashed border-fifa-border rounded-2xl bg-fifa-input/50 transition-colors duration-300">
          <span className="text-6xl mb-5 opacity-60">⚽</span>
          <p className="uppercase tracking-[0.3em] font-bold text-xs bg-fifa-border/50 px-4 py-2 rounded-full text-fifa-dark transition-colors duration-300">
            Awaiting the Draw
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6 max-h-[800px] overflow-y-auto pr-3 custom-scrollbar p-1">
          {results.map((result, idx) => (
            <div
              key={idx}
              className="bg-fifa-card border border-fifa-border p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-fifa-primary/50 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-fifa-border">
                <h3 className="font-extrabold text-xl text-fifa-dark group-hover:text-fifa-primary transition-colors uppercase tracking-wide">
                  {result.participant}
                </h3>
                <span className="text-xs font-bold text-fifa-muted bg-fifa-input px-3 py-1 rounded-full group-hover:bg-fifa-primary/10 group-hover:text-fifa-primary transition-colors">
                  {result.teams.length} Teams
                </span>
              </div>

              <ul className="space-y-3">
                {result.teams.map((team) => (
                  <li
                    key={team.name}
                    className="bg-fifa-input border border-fifa-border px-4 py-2.5 rounded-xl text-sm text-fifa-dark flex items-center gap-3.5 font-medium shadow-inner transition-colors group-hover:bg-fifa-card"
                  >
                    <span className="text-2xl w-8 text-center">
                      {team.flag}
                    </span>
                    <span className="flex-1 font-semibold uppercase">
                      {team.name}
                    </span>
                    <span className="text-fifa-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
