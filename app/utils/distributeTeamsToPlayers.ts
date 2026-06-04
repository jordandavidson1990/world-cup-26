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

  const sequentialIndices = Array.from(
    { length: numPlayers },
    (_, index) => index
  );

  const shuffledPlayerIndices = shuffleArray(sequentialIndices);

  pots.forEach((pot) => {
    const randomizedPot = shuffleArray(pot);

    allocateTeamsFromPot(
      randomizedPot,
      shuffledPlayerIndices,
      playerTeams,
      playerQuotas
    );
  });

  const shuffledPlayerTeams = shuffleArray(playerTeams);

  return shuffledPlayerTeams;
};
