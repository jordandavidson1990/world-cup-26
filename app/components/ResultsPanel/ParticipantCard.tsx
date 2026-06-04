import { useEffect, useState } from "react";
import { SweepstakeResult } from "../../types";
import { TeamItem } from "./TeamItem";

type ParticipantCardProps = {
  result: SweepstakeResult;
};

export const ParticipantCard = ({ result }: ParticipantCardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showTeams, setShowTeams] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const timer = setTimeout(() => {
      setShowTeams(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-fifa-card border border-fifa-border p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-fifa-primary/50 transition-all duration-700 ease-out transform group ${
        isMounted
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
      }`}
    >
      {/* Participant Header (Appears instantly with the card) */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-fifa-border">
        <h3 className="font-extrabold text-xl text-fifa-dark group-hover:text-fifa-primary transition-colors uppercase tracking-wide">
          {result.participant}
        </h3>
        <span className="text-xs font-bold text-fifa-muted bg-fifa-input px-3 py-1 rounded-full group-hover:bg-fifa-primary/10 group-hover:text-fifa-primary transition-colors">
          {result.teams.length} Teams
        </span>
      </div>

      {/* 3. Team List (Waits for showTeams to become true, then slides up smoothly) */}
      <ul
        className={`space-y-3 transition-all duration-500 ease-out transform ${
          showTeams ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {result.teams.map((team) => (
          <TeamItem key={team.name} team={team} />
        ))}
      </ul>
    </div>
  );
};
