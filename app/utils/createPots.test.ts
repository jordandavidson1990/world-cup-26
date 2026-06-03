import { createPots } from "./createPots";
import { Team } from "../types";

describe("createPots", () => {
  const mockTeams: Team[] = Array.from({ length: 24 }, (_, i) => ({
    name: `Team ${i + 1}`,
    rank: i + 1,
    flag: "⚽",
  }));

  test("splits sorted teams into requested pot chunks", () => {
    const result = createPots(mockTeams, 12);
    expect(result.length).toBe(2);
    expect(result[0].length).toBe(12);
    expect(result[1].length).toBe(12);
  });

  test("contains top ranked items within the initial pot container", () => {
    const result = createPots(mockTeams, 12);
    const potOneRanks = result[0].map((t) => t.rank);

    expect(Math.max(...potOneRanks)).toBeLessThanOrEqual(12);
  });
});
