import { bench } from "vitest";
import AStarPathFinding, { AStarPathFindingSearchType } from "./AStarPathFinding.ts";

// prettier-ignore
const matrix1D = [
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
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
  5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
];

const config = {
  matrix1D,
  matrixWidth: 20,
  matrixHeight: 15,
  searchType: AStarPathFindingSearchType.CONTINUOUS,
  startCoordinates: { x: 9, y: 6 },
  finishCoordinates: { x: 11, y: 4 },
};

const aStar = new AStarPathFinding(config);

bench(
  "search 20x15",
  () => {
    aStar.init(config);
    aStar.search();
  },
  { time: 1000 },
);
