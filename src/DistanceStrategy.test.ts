import { EuclideanDistance, ManhattanDistance } from "./DistanceStrategy.ts";

describe("DistanceStrategy", () => {
  test("Euclidean distance", () => {
    const dist = new EuclideanDistance();
    expect(dist.calculate({ x: 0, y: 0 }, { x: 0, y: 0 })).toEqual(0);
    expect(dist.calculate({ x: 0, y: 0 }, { x: 3, y: 4 })).toEqual(5);
  });

  test("Manhattan distance", () => {
    const dist = new ManhattanDistance();
    expect(dist.calculate({ x: 0, y: 0 }, { x: 0, y: 0 })).toEqual(0);
    expect(dist.calculate({ x: 0, y: 0 }, { x: 3, y: 4 })).toEqual(7);
  });
});
