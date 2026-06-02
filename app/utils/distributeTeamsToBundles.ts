import { Team } from "../types";
import { shuffleArray } from "./shuffleArray";

export const distributeTeamsToBundles = (
  teams: Team[],
  numParticipants: number
): Team[][] => {
  const potSize = 12;
  const sortedTeams = [...teams].sort((a, b) => a.rank - b.rank);

  const pots: Team[][] = [
    shuffleArray(sortedTeams.slice(0, potSize)), // Pot 1 (Top Tier)
    shuffleArray(sortedTeams.slice(potSize, potSize * 2)), // Pot 2 (Upper-Mid)
    shuffleArray(sortedTeams.slice(potSize * 2, potSize * 3)), // Pot 3 (Lower-Mid)
    shuffleArray(sortedTeams.slice(potSize * 3, potSize * 4)), // Pot 4 (Outsiders)
  ];

  // Initialize empty array bundles for each participant
  const bundles: Team[][] = Array.from({ length: numParticipants }, () => []);

  // Round-robin distribution across all pots sequentially to guarantee fairness
  pots.forEach((pot) => {
    pot.forEach((team, index) => {
      const bundleIndex = index % numParticipants;
      bundles[bundleIndex].push(team);
    });
  });

  return shuffleArray(bundles);
};
