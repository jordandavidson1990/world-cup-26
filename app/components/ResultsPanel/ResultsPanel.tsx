import { SweepstakeResult } from "../../types";
import { useResultsReveal } from "../../hooks/useResultsReveal";

import { DrawLoader, EmptyState, ParticipantCard, ResultsHeader } from ".";

type ResultsPanelProps = {
  results: SweepstakeResult[];
  isDrawing: boolean;
};

const ResultsPanel = ({ results, isDrawing }: ResultsPanelProps) => {
  const { visibleCount, scrollContainerRef, isRevealComplete } =
    useResultsReveal(results, isDrawing);

  return (
    <section className="bg-fifa-card p-7 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-fifa-border min-h-[500px] transition-colors duration-300 relative">
      <ResultsHeader />

      {!isDrawing && results.length > 0 && (
        <div className="mb-6 flex items-center justify-between bg-fifa-input border border-fifa-border px-4 py-2.5 rounded-xl transition-colors duration-300">
          <span className="text-xs font-bold uppercase tracking-wider text-fifa-dark">
            Ceremony Status:
          </span>
          <span
            className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${
              isRevealComplete
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-fifa-primary/10 text-fifa-primary animate-pulse"
            }`}
          >
            {isRevealComplete
              ? "Official Allocations Confirmed"
              : `Revealing ${visibleCount} of ${results.length}`}
          </span>
        </div>
      )}

      {isDrawing ? (
        <DrawLoader />
      ) : results.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          ref={scrollContainerRef}
          className="grid sm:grid-cols-2 gap-6 max-h-[800px] overflow-y-auto pr-3 custom-scrollbar p-1 scroll-smooth"
        >
          {results.slice(0, visibleCount).map((result, idx) => (
            <ParticipantCard key={idx} result={result} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ResultsPanel;
