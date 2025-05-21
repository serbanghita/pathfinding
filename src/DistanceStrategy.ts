import { MatrixTileCoordinates } from "./AStarPathFinding.ts";

export interface DistanceStrategy {
  calculate(start: MatrixTileCoordinates, finish: MatrixTileCoordinates): number;
}

export class EuclideanDistance implements DistanceStrategy {
  public calculate(start: MatrixTileCoordinates, finish: MatrixTileCoordinates): number {
    return Math.sqrt(Math.pow(start.x - finish.x, 2) + Math.pow(start.y - finish.y, 2));
  }
}

export class ManhattanDistance implements DistanceStrategy {
  public calculate(start: MatrixTileCoordinates, finish: MatrixTileCoordinates): number {
    return Math.abs(start.x - finish.x) + Math.abs(start.y - finish.y);
  }
}
