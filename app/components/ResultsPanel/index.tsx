import { SweepstakeResult } from "../../types";
import ResultsHeader from "./ResultsHeader";
import DrawLoader from "./DrawLoader";
import EmptyState from "./EmptyState";
import ParticipantCard from "./ParticipantCard";

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
      <ResultsHeader />
      {isDrawing ? (
        <DrawLoader />
      ) : results.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid sm:grid-cols-2 gap-6 max-h-[800px] overflow-y-auto pr-3 custom-scrollbar p-1">
          {results.map((result, idx) => (
            <ParticipantCard key={idx} result={result} />
          ))}
        </div>
      )}
    </section>
  );
}
