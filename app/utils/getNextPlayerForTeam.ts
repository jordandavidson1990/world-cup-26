import { Team } from "../types";

const getPlayersWithRemainingCapacity = (
  playerIndices: number[],
  playerTeams: Team[][],
  playerQuotas: number[]
): number[] => {
  return playerIndices.filter((index) => {
    const currentTeamCount = playerTeams[index].length;
    const maxAllowedQuota = playerQuotas[index];

    return currentTeamCount < maxAllowedQuota;
  });
};

const sortPlayersByDraftPriority = (
  eligibleIndices: number[],
  playerTeams: Team[][],
  playerQuotas: number[],
  potAllocations: number[]
): void => {
  eligibleIndices.sort((playerA, playerB) => {
    const potCountA = potAllocations[playerA];
    const potCountB = potAllocations[playerB];
    if (potCountA !== potCountB) {
      return potCountA - potCountB;
    }

    const quotaA = playerQuotas[playerA];
    const quotaB = playerQuotas[playerB];
    if (quotaA !== quotaB) {
      return quotaA - quotaB;
    }

    const totalTeamsA = playerTeams[playerA].length;
    const totalTeamsB = playerTeams[playerB].length;
    return totalTeamsA - totalTeamsB;
  });
};

export const getNextPlayerForTeam = (
  playerIndices: number[],
  playerTeams: Team[][],
  playerQuotas: number[],
  potAllocations: number[]
): number => {
  const eligiblePlayers = getPlayersWithRemainingCapacity(
    playerIndices,
    playerTeams,
    playerQuotas
  );

  sortPlayersByDraftPriority(
    eligiblePlayers,
    playerTeams,
    playerQuotas,
    potAllocations
  );

  const bestMatchingPlayerIndex = eligiblePlayers[0];
  return bestMatchingPlayerIndex;
};
