import { Team } from "../types";
import { getNextPlayerForTeam } from "./getNextPlayerForTeam";

describe("getNextPlayerForTeam", () => {
  const mockTeam: Team = { name: "Test Team", rank: 1, flag: "⚽" };

  test("filters out participants at maximum capacity", () => {
    const participantIndices = [0, 1];
    const bundles: Team[][] = [[mockTeam], []];
    const totalCapacities = [1, 2];
    const teamsAllocatedFromCurrentPot = [0, 0];

    const result = getNextPlayerForTeam(
      participantIndices,
      bundles,
      totalCapacities,
      teamsAllocatedFromCurrentPot
    );

    expect(result).toBe(1);
  });

  test("prioritizes participant with fewer selections from current pot", () => {
    const participantIndices = [0, 1];
    const bundles: Team[][] = [[], []];
    const totalCapacities = [2, 2];
    const teamsAllocatedFromCurrentPot = [1, 0];

    const result = getNextPlayerForTeam(
      participantIndices,
      bundles,
      totalCapacities,
      teamsAllocatedFromCurrentPot
    );

    expect(result).toBe(1);
  });

  test("prioritizes smaller total capacity on ties", () => {
    const participantIndices = [0, 1];
    const bundles: Team[][] = [[], []];
    const totalCapacities = [3, 2];
    const teamsAllocatedFromCurrentPot = [0, 0];

    const result = getNextPlayerForTeam(
      participantIndices,
      bundles,
      totalCapacities,
      teamsAllocatedFromCurrentPot
    );

    expect(result).toBe(1);
  });
});
