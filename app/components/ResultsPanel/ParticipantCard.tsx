import { SweepstakeResult } from "../../types";
import TeamItem from "./TeamItem";

interface ParticipantCardProps {
  result: SweepstakeResult;
}

export default function ParticipantCard({ result }: ParticipantCardProps) {
  return (
    <div className="bg-fifa-card border border-fifa-border p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-fifa-primary/50 transition-all duration-300 transform hover:-translate-y-1 group">
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
          <TeamItem key={team.name} team={team} />
        ))}
      </ul>
    </div>
  );
}
