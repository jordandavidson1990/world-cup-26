import { Team } from "../types";
import { shuffleArray } from "./shuffleArray";

export const groupTeamsIntoPots = (
  teams: Team[],
  potSize: number = 12
): Team[][] => {
  const sortedTeams = [...teams].sort((a, b) => a.rank - b.rank);
  const numPots = Math.ceil(sortedTeams.length / potSize);
  const shuffledTeams = Array.from({ length: numPots }, (_, i) =>
    shuffleArray(sortedTeams.slice(i * potSize, (i + 1) * potSize))
  );

  return shuffledTeams;
};
