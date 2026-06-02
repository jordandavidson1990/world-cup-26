import { Team } from "../types";
import { shuffleArray } from "./shuffleArray";

export const distributeTeamsToBundles = (
  teams: Team[],
  numParticipants: number
): Team[][] => {
  const potSize = 12;
  const sortedTeams = [...teams].sort((a, b) => a.rank - b.rank);

  const pots: Team[][] = [
    shuffleArray(sortedTeams.slice(0, potSize)),
    shuffleArray(sortedTeams.slice(potSize, potSize * 2)),
    shuffleArray(sortedTeams.slice(potSize * 2, potSize * 3)),
    shuffleArray(sortedTeams.slice(potSize * 3, potSize * 4)),
  ];

  const bundles: Team[][] = Array.from({ length: numParticipants }, () => []);

  // NEW: A continuous counter that DOES NOT reset per pot
  let teamCounter = 0;

  pots.forEach((pot) => {
    pot.forEach((team) => {
      // Use the global counter to ensure "overspill" moves to the next person
      const bundleIndex = teamCounter % numParticipants;
      bundles[bundleIndex].push(team);
      teamCounter++;
    });
  });

  return shuffleArray(bundles);
};
