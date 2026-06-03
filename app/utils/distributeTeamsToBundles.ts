import { Team } from "../types";
import { shuffleArray } from "./shuffleArray";
import { calculateCapacities } from "./calculateCapacities";
import { createPots } from "./createPots";
import { determineTargetParticipant } from "./determineTargetParticipant";

type DistributionOptions = {
  potSize?: number;
};

export const distributeTeamsToBundles = (
  teams: Team[],
  numParticipants: number,
  options: DistributionOptions = {}
): Team[][] => {
  const { potSize = 12 } = options;

  const pots = createPots(teams, potSize);
  const totalCapacities = calculateCapacities(teams.length, numParticipants);
  const bundles: Team[][] = Array.from({ length: numParticipants }, () => []);
  const participantIndices = Array.from(
    { length: numParticipants },
    (_, index) => index
  );

  pots.forEach((pot) => {
    const teamsAllocatedFromCurrentPot = Array(numParticipants).fill(0);

    pot.forEach((team) => {
      const targetParticipantIndex = determineTargetParticipant(
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
