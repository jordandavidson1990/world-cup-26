import { Team } from "../types";
import { allocateTeamsFromPot, getNextPlayerForTeam } from ".";

jest.mock("../getNextPlayerForTeam");

describe("allocateTeamsFromPot", () => {
  const mockGetNextPlayer = getNextPlayerForTeam as jest.MockedFunction<
    typeof getNextPlayerForTeam
  >;

  const team1: Team = { name: "Argentina", rank: 1, flag: "🇦🇷" };
  const team2: Team = { name: "France", rank: 2, flag: "🇫🇷" };
  const team3: Team = { name: "Brazil", rank: 5, flag: "🇧🇷" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("correctly distributes teams to the players selected by the draft engine", () => {
    const pot = [team1, team2];
    const playerIndices = [0, 1];
    const playerQuotas = [2, 2];
    const playerTeams: Team[][] = [[], []];

    mockGetNextPlayer.mockReturnValueOnce(0).mockReturnValueOnce(1);

    allocateTeamsFromPot(pot, playerIndices, playerTeams, playerQuotas);

    expect(playerTeams[0]).toContain(team1);
    expect(playerTeams[1]).toContain(team2);
    expect(playerTeams[0]).toHaveLength(1);
    expect(playerTeams[1]).toHaveLength(1);
  });

  test("handles uneven distributions if one player is picked multiple times", () => {
    const pot = [team1, team2, team3];
    const playerIndices = [0, 1];
    const playerQuotas = [3, 3];
    const playerTeams: Team[][] = [[], []];

    mockGetNextPlayer.mockReturnValue(1);

    allocateTeamsFromPot(pot, playerIndices, playerTeams, playerQuotas);

    expect(playerTeams[0]).toHaveLength(0);
    expect(playerTeams[1]).toEqual([team1, team2, team3]);
  });

  test("does nothing and mutates nothing if the pot is empty", () => {
    const pot: Team[] = [];
    const playerIndices = [0, 1];
    const playerQuotas = [2, 2];
    const playerTeams: Team[][] = [[], []];

    allocateTeamsFromPot(pot, playerIndices, playerTeams, playerQuotas);

    expect(mockGetNextPlayer).not.toHaveBeenCalled();
    expect(playerTeams).toEqual([[], []]);
  });
});
