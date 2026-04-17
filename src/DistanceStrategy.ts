import { MatrixTileCoordinates } from "./AStarPathFinding.ts";

export interface DistanceStrategy {
  calculate(start: MatrixTileCoordinates, finish: MatrixTileCoordinates): number;
}

export class EuclideanDistance implements DistanceStrategy {
  public calculate(start: MatrixTileCoordinates, finish: MatrixTileCoordinates): number {
    const dx = start.x - finish.x;
    const dy = start.y - finish.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

export class ManhattanDistance implements DistanceStrategy {
  public calculate(start: MatrixTileCoordinates, finish: MatrixTileCoordinates): number {
    return Math.abs(start.x - finish.x) + Math.abs(start.y - finish.y);
  }
}
