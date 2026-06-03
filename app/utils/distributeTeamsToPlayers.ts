import { Team } from "../types";
import {
  allocateTeamsFromPot,
  calculatePlayerQuotas,
  groupTeamsIntoPots,
  shuffleArray,
} from ".";

type DistributionOptions = {
  potSize?: number;
};

export const distributeTeamsToPlayers = (
  teams: Team[],
  numPlayers: number,
  options: DistributionOptions = {}
): Team[][] => {
  const { potSize = 12 } = options;

  const pots = groupTeamsIntoPots(teams, potSize);
  const playerQuotas = calculatePlayerQuotas(teams.length, numPlayers);

  const playerTeams: Team[][] = Array.from({ length: numPlayers }, () => []);
  const playerIndices = Array.from({ length: numPlayers }, (_, index) => index);

  pots.forEach((pot) => {
    allocateTeamsFromPot(pot, playerIndices, playerTeams, playerQuotas);
  });

  const shuffledPlayerTeams = shuffleArray(playerTeams);

  return shuffledPlayerTeams;
};
