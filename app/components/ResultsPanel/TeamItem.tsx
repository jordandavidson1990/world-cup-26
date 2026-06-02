import { Team } from "../../types";

interface TeamItemProps {
  team: Team;
}

export default function TeamItem({ team }: TeamItemProps) {
  return (
    <li className="bg-fifa-input border border-fifa-border px-4 py-2.5 rounded-xl text-sm text-fifa-dark flex items-center gap-3.5 font-medium shadow-inner transition-colors group-hover:bg-fifa-card">
      <span className="text-2xl w-8 text-center">{team.flag}</span>
      <span className="flex-1 font-semibold uppercase">{team.name}</span>
    </li>
  );
}
