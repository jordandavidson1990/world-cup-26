import { distributeTeamsToPlayers } from "./distributeTeamsToPlayers";
import { Team } from "../types";

describe("distributeTeamsToPlayers", () => {
  const mockTeams: Team[] = Array.from({ length: 46 }, (_, i) => ({
    name: `Team ${i + 1}`,
    rank: i + 1,
    flag: "⚽",
  }));

  test("distributes total entities matches cumulative output quantities", () => {
    const result = distributeTeamsToPlayers(mockTeams, 4);
    const totalDistributed = result.reduce(
      (sum, bundle) => sum + bundle.length,
      0
    );

    expect(totalDistributed).toBe(46);
  });

  test("gives lower capacity bundle slots explicit priority on top seeded ranks", () => {
    const result = distributeTeamsToPlayers(mockTeams, 4);

    const smallBundles = result.filter((b) => b.length === 11);
    const largeBundles = result.filter((b) => b.length === 12);

    const smallBundleTopSeedAverage =
      smallBundles.reduce((sum, b) => {
        const sorted = [...b].sort((x, y) => x.rank - y.rank);
        return sum + sorted[0].rank;
      }, 0) / smallBundles.length;

    const largeBundleTopSeedAverage =
      largeBundles.reduce((sum, b) => {
        const sorted = [...b].sort((x, y) => x.rank - y.rank);
        return sum + sorted[0].rank;
      }, 0) / largeBundles.length;

    expect(smallBundleTopSeedAverage).toBeLessThanOrEqual(
      largeBundleTopSeedAverage
    );
  });
});
