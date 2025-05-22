import { bench } from "vitest";
import AStarPathFinding, { AStarPathFindingSearchType } from "./AStarPathFinding.ts";

const aStar = new AStarPathFinding({
  // prettier-ignore
  matrix1D: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5,
    5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 5, 5, 5, 5, 0, 5, 0, 5, 0, 5,
    5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5,
    5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 0, 0, 5,
    5, 0, 0, 0, 0, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 0, 5, 0, 5,
    5, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 5, 5, 0, 5,
    5, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 5,
    5, 0, 0, 0, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 0, 5,
    5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5,
    5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 5, 0, 0, 0, 0, 5,
    5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5,
    5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5,
    5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  matrixWidth: 20,
  matrixHeight: 15,
  searchType: AStarPathFindingSearchType.CONTINUOUS,
  startCoordinates: { x: 9, y: 6 },
  finishCoordinates: { x: 11, y: 4 },
});

bench(
  "normal function",
  () => {
    aStar.search();
  },
  { time: 1000 },
); // Run for 1000ms to get stable results
