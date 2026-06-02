import { SweepstakeResult } from "../types";

interface ResultsPanelProps {
  results: SweepstakeResult[];
}

export default function ResultsPanel({ results }: ResultsPanelProps) {
  return (
    <section className="bg-fifa-card p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-fifa-border min-h-[500px] transition-colors duration-300">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-fifa-input rounded-xl flex items-center justify-center text-2xl shadow-inner">
          🌍
        </div>
        <h2 className="text-2xl font-extrabold uppercase tracking-tight text-fifa-dark">
          Final Group Allocations
        </h2>
      </div>

      {results.length === 0 ? (
        <div className="h-80 flex flex-col items-center justify-center text-fifa-muted border-4 border-dashed border-fifa-border rounded-2xl bg-fifa-input/50">
          <span className="text-6xl mb-5 opacity-60">⚽</span>
          <p className="uppercase tracking-[0.3em] font-bold text-xs bg-fifa-border/50 px-4 py-2 rounded-full text-fifa-dark">
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
                <h3 className="font-extrabold text-xl text-fifa-dark group-hover:text-fifa-primary transition-colors">
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
                    <span className="flex-1 font-semibold">{team.name}</span>
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
