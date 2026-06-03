import { Team } from "../types";
import { getNextPlayerForTeam } from "./getNextPlayerForTeam";

export const allocateTeamsFromPot = (
  pot: Team[],
  playerIndices: number[],
  playerTeams: Team[][],
  playerQuotas: number[]
): void => {
  const numPlayers = playerIndices.length;
  const potAllocations = Array(numPlayers).fill(0);

  pot.forEach((team) => {
    const nextPlayerIndex = getNextPlayerForTeam(
      playerIndices,
      playerTeams,
      playerQuotas,
      potAllocations
    );

    playerTeams[nextPlayerIndex].push(team);
    potAllocations[nextPlayerIndex]++;
  });
};
