import { Team } from "../types";

export const determineTargetParticipant = (
  participantIndices: number[],
  bundles: Team[][],
  totalCapacities: number[],
  teamsAllocatedFromCurrentPot: number[]
): number => {
  const eligibleIndices = participantIndices.filter((index) => {
    const hasRemainingCapacity = bundles[index].length < totalCapacities[index];
    return hasRemainingCapacity;
  });

  eligibleIndices.sort((indexA, indexB) => {
    const currentPotCountA = teamsAllocatedFromCurrentPot[indexA];
    const currentPotCountB = teamsAllocatedFromCurrentPot[indexB];
    const potAllocationsDiffer = currentPotCountA !== currentPotCountB;

    if (potAllocationsDiffer) {
      return currentPotCountA - currentPotCountB;
    }

    const totalCapacityA = totalCapacities[indexA];
    const totalCapacityB = totalCapacities[indexB];
    const totalCapacitiesDiffer = totalCapacityA !== totalCapacityB;

    if (totalCapacitiesDiffer) {
      return totalCapacityA - totalCapacityB;
    }

    const overallLengthA = bundles[indexA].length;
    const overallLengthB = bundles[indexB].length;
    return overallLengthA - overallLengthB;
  });

  return eligibleIndices[0];
};
