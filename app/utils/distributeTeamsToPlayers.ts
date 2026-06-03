import { Team } from "../types";
import {
  calculatePlayerQuotas,
  getNextPlayerForTeam,
  groupTeamsIntoPots,
  shuffleArray,
} from ".";

type DistributionOptions = {
  potSize?: number;
};

export const distributeTeamsToPlayers = (
  teams: Team[],
  numParticipants: number,
  options: DistributionOptions = {}
): Team[][] => {
  const { potSize = 12 } = options;

  const pots = groupTeamsIntoPots(teams, potSize);
  const totalCapacities = calculatePlayerQuotas(teams.length, numParticipants);
  const bundles: Team[][] = Array.from({ length: numParticipants }, () => []);
  const participantIndices = Array.from(
    { length: numParticipants },
    (_, index) => index
  );

  pots.forEach((pot) => {
    const teamsAllocatedFromCurrentPot = Array(numParticipants).fill(0);

    pot.forEach((team) => {
      const targetParticipantIndex = getNextPlayerForTeam(
        participantIndices,
        bundles,
        totalCapacities,
        teamsAllocatedFromCurrentPot
      );

      bundles[targetParticipantIndex].push(team);
      teamsAllocatedFromCurrentPot[targetParticipantIndex]++;
    });
  });

  return shuffleArray(bundles);
};
