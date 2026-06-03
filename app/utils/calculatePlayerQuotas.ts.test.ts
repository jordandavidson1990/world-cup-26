import { calculatePlayerQuotas } from "./calculatePlayerQuotas";

describe("calculatePlayerQuotas", () => {
  test("handles even distributions without remainders", () => {
    const result = calculatePlayerQuotas(48, 4);
    expect(result).toEqual([12, 12, 12, 12]);
  });

  test("allocates remainder to initial indices", () => {
    const result = calculatePlayerQuotas(46, 4);
    expect(result).toEqual([12, 12, 11, 11]);
  });

  test("handles single remainder distribution", () => {
    const result = calculatePlayerQuotas(45, 4);
    expect(result).toEqual([12, 11, 11, 11]);
  });
});
