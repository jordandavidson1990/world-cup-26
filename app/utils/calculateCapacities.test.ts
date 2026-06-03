import { calculateCapacities } from "./calculateCapacities";

describe("calculateCapacities", () => {
  test("handles even distributions without remainders", () => {
    const result = calculateCapacities(48, 4);
    expect(result).toEqual([12, 12, 12, 12]);
  });

  test("allocates remainder to initial indices", () => {
    const result = calculateCapacities(46, 4);
    expect(result).toEqual([12, 12, 11, 11]);
  });

  test("handles single remainder distribution", () => {
    const result = calculateCapacities(45, 4);
    expect(result).toEqual([12, 11, 11, 11]);
  });
});
