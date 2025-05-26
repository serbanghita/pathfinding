import MinHeapWithNodes, { MinHeapNode } from "./MinHeapWithNodes.ts";
import { DistanceStrategy, ManhattanDistance } from "./DistanceStrategy.ts";
import { isNumber } from "./utils.ts";

const directions: [number, number][] = [
  [-1, 0], // left
  [1, 0], // right
  [0, -1], // top
  [0, 1], // bottom
];

export enum AStarPathFindingSearchType {
  CONTINUOUS = 0x1,
  BY_STEP = 0x2,
}

export enum AStarPathFindingResultType {
  FULL_PATH_ARRAY = 0x1,
  WAYPOINT_PATH_ARRAY = 0x2,
}

export enum AStarPathFindingSearchStatus {
  INIT = 0x1,
  SEARCHING = 0x2,
  FOUND = 0x3,
  NOT_FOUND = 0x4,
}

export type AStarPathFindingInit = {
  // 2d matrix.
  matrix2D?: number[][];

  // 1d flat matrix.
  matrix1D?: number[];
  matrixWidth?: number;
  matrixHeight?: number;

  startCoordinates: MatrixTileCoordinates;
  finishCoordinates: MatrixTileCoordinates;
  searchType?: AStarPathFindingSearchType;
  resultType?: AStarPathFindingResultType;
  distanceStrategy?: DistanceStrategy;

  onInsertQueue?: (node: MinHeapNode) => void;
  onSuccess?: (result: number[]) => void;
};

export type MatrixTileCoordinates = {
  x: number;
  y: number;
};

export default class AStarPathFinding {
  public queue!: MinHeapWithNodes;
  public visitedTiles: Set<number> = new Set();
  // Map<tile, cameFromTile>
  public cameFromTiles: Map<number, number> = new Map();
  // Maps tileValue to best known gCost
  private nodeCosts: Map<number, number> = new Map();
  // The path found on success.
  public path: number[] = [];
  private matrixWidth!: number;
  private matrixHeight!: number;
  private matrix2D: number[][] = [];
  private matrix1D: number[] = [];
  private matrixSize!: number;
  private searchType: AStarPathFindingSearchType = AStarPathFindingSearchType.CONTINUOUS;
  private resultType: AStarPathFindingResultType = AStarPathFindingResultType.FULL_PATH_ARRAY;
  private distanceStrategy: DistanceStrategy = new ManhattanDistance();
  private startCoordinates!: MatrixTileCoordinates;
  public startTileValue!: number;
  private finishCoordinates!: MatrixTileCoordinates;
  public finishTileValue!: number;
  public status: AStarPathFindingSearchStatus = AStarPathFindingSearchStatus.INIT;
  private onInsertQueue: (node: MinHeapNode) => void = () => undefined;
  private onSuccess: (foundPath: number[]) => void = () => undefined;

  public constructor(config: AStarPathFindingInit) {
    this.init(config);
  }

  private checkMatrix1D(config: AStarPathFindingInit): void {
    if (config.matrix1D?.length === 0) {
      throw new Error(`Please set the matrix before attempting a search.`);
    }
    if (!config.matrixWidth || !config.matrixHeight) {
      throw new Error(`Matrix width/height for 1D matrix have not been defined.`);
    }
    if (config.matrixWidth * config.matrixHeight !== config.matrix1D?.length) {
      throw new Error(`Matrix width/height does not match the 1D matrix.`);
    }
  }

  private checkMatrix2D(config: AStarPathFindingInit): void {
    if (!Array.isArray(config.matrix2D) || config.matrix2D?.length === 0) {
      throw new Error(`Please set the matrix before attempting a search.`);
    }

    if (config.matrix2D[0]?.length === 0 || config.matrix2D.length === 1) {
      throw new Error(`Please set matrix rows.`);
    }
  }

  public init(config: AStarPathFindingInit): void {
    this.status = AStarPathFindingSearchStatus.INIT;

    if (config.matrix2D) {
      this.checkMatrix2D(config);
      this.matrix1D = config.matrix2D.reduce((acc, row) => [...acc, ...row], []);
      this.matrixWidth = config.matrix2D[0]?.length;
      this.matrixHeight = config.matrix2D.length;
    } else if (config.matrix1D) {
      this.checkMatrix1D(config);
      this.matrix1D = config.matrix1D;
      this.matrixWidth = config.matrixWidth as number;
      this.matrixHeight = config.matrixHeight as number;
    } else {
      throw new Error(`No matrix has been defined.`);
    }

    this.matrixSize = this.matrixWidth * this.matrixHeight;

    if (config.searchType) {
      this.searchType = config.searchType;
    }
    if (config.resultType) {
      this.resultType = config.resultType;
    }
    // Duck type check of DistanceStrategy since types are not available at runtime.
    if (config.distanceStrategy && typeof config.distanceStrategy.calculate === "function") {
      this.distanceStrategy = config.distanceStrategy;
    }

    if (config.onInsertQueue) {
      this.onInsertQueue = config.onInsertQueue;
    }

    if (config.onSuccess) {
      this.onSuccess = config.onSuccess;
    }

    if (
      config.startCoordinates.x < 0 ||
      config.startCoordinates.y < 0 ||
      config.startCoordinates.x > this.matrixWidth - 1 ||
      config.startCoordinates.y > this.matrixHeight - 1 ||
      config.finishCoordinates.x < 0 ||
      config.finishCoordinates.y < 0 ||
      config.finishCoordinates.x > this.matrixWidth - 1 ||
      config.finishCoordinates.y > this.matrixHeight - 1
    ) {
      throw new Error(
        `Out of bounds coordinates: start (${config.startCoordinates.x}, ${config.startCoordinates.y}) finish (${config.finishCoordinates.x}, ${config.finishCoordinates.y})`,
      );
    }

    this.startCoordinates = config.startCoordinates;
    this.startTileValue = this.getTileValueFromCoordinates(config.startCoordinates.x, config.startCoordinates.y);
    this.finishCoordinates = config.finishCoordinates;
    this.finishTileValue = this.getTileValueFromCoordinates(config.finishCoordinates.x, config.finishCoordinates.y);

    // Push the first "Start" tile in order to start searching.
    const hCost = this.calculateDistanceBetweenTwoTiles(this.startTileValue, this.finishTileValue);
    // console.log("hCost", hCost);
    this.queue = new MinHeapWithNodes([{ value: this.startTileValue, hCost, gCost: 0, fCost: hCost }]);
    // Reset previously found path.
    this.path = [];
  }

  private visit(node: MinHeapNode): boolean {
    this.visitedTiles.add(node.value);

    return node.value === this.finishTileValue;
  }

  /**
   * Used for continuous (single/multi thread) search. (e.g. WebWorker).
   * @private
   */
  private searchByLoop(): boolean {
    let found = false;

    while (this.queue.size > 0) {
      found = this.doSearch();
    }

    return found;
  }

  /**
   * Used for sequential searching (e.g. 30 times / sec)
   * @private
   */
  private searchByStep(): boolean {
    if (this.queue.size > 0) {
      return this.doSearch();
    }

    if (this.queue.size === 0) {
      this.status = AStarPathFindingSearchStatus.NOT_FOUND;
    }

    return false;
  }

  private doSearch(): boolean {
    const node = this.queue.remove();
    const found = this.visit(node);

    if (found) {
      this.status = AStarPathFindingSearchStatus.FOUND;
      this.queue.clear();
      // console.log(this.cameFromTiles);
      if (this.resultType === AStarPathFindingResultType.WAYPOINT_PATH_ARRAY) {
        this.doBacktrackInflection(node);
      } else {
        this.doBacktrackAll(node);
      }
      this.onSuccess(this.path);
      return true;
    }

    // For each direction, plan to visit respective tile.
    directions.forEach((direction) => {
      const futureNode = this.computeFutureTileValueAndCostFromDirection(node, direction);

      if (futureNode !== null && !this.queue.includes(futureNode.value) && futureNode.value !== node.value) {
        this.queue.insert(futureNode);
        this.cameFromTiles.set(futureNode.value, node.value);

        this.onInsertQueue(futureNode);
      }
    });

    return false;
  }

  private doBacktrackAll(node: MinHeapNode) {
    let current: number = node.value;
    const path: number[] = [current];

    while (this.cameFromTiles.has(current)) {
      const cameFrom: number = this.cameFromTiles.get(current) as number;
      path.unshift(cameFrom);
      current = cameFrom;
    }

    this.path = path;
  }

  private doBacktrackInflection(node: MinHeapNode) {
    let current: number = node.value;
    let lastAdded: number = node.value;
    const path: number[] = [current];

    while (this.cameFromTiles.has(current)) {
      const cameFrom: number = this.cameFromTiles.get(current) as number;

      const cameFromXY = this.getCoordinatesFromTileValue(cameFrom);
      const lastAddedXY = this.getCoordinatesFromTileValue(lastAdded);
      // Check if the current tile has changed direction (row or column).
      if (cameFromXY.x !== lastAddedXY.x && cameFromXY.y !== lastAddedXY.y) {
        lastAdded = cameFrom;
        path.unshift(current);
      }
      current = cameFrom;
    }

    // Add the starting tile.
    path.unshift(current);

    this.path = path;
  }

  public search(): boolean {
    this.status = AStarPathFindingSearchStatus.SEARCHING;

    if (this.searchType === AStarPathFindingSearchType.CONTINUOUS) {
      return this.searchByLoop();
    }

    //if (this.searchType === AStarPathFindingSearchType.BY_STEP) {
    return this.searchByStep();
    //}
  }

  public getTileValueFromCoordinates(x: number, y: number): number {
    const tileIndex = x + this.matrixWidth * y;

    if (tileIndex < 0 || tileIndex > this.matrixWidth * this.matrixHeight - 1) {
      throw new Error(`Invalid tile ${tileIndex} resulted from ${x} and ${y}`);
    }

    return tileIndex;
  }

  public getCoordinatesFromTileValue(tileValue: number): {
    x: number;
    y: number;
  } {
    return {
      x: tileValue % this.matrixWidth,
      y: Math.floor(tileValue / this.matrixWidth),
    };
  }

  /**
   Calculates the distance between two tiles using the configured distance strategy.
   @param start - The starting tile index
   @param finish - The target tile index
   @returns The calculated distance between the tiles
   */
  public calculateDistanceBetweenTwoTiles(start: number, finish: number): number {
    const startCoords = this.getCoordinatesFromTileValue(start);
    const finishCoords = this.getCoordinatesFromTileValue(finish);

    if (!isNumber(startCoords.x) || !isNumber(startCoords.y) || !isNumber(finishCoords.x) || !isNumber(finishCoords.y)) {
      throw new Error(`Invalid coordinates start(${startCoords.x} ${startCoords.y}) finish(${finishCoords.x} ${finishCoords.y})`);
    }
    return this.distanceStrategy.calculate(startCoords, finishCoords);
  }

  private computeFutureTileValueAndCostFromDirection(node: MinHeapNode, [directionX, directionY]: [number, number]): MinHeapNode | null {
    let futureTileValue: number;
    let hCost: number;
    let gCost: number;
    let fCost: number;

    if (directionX !== 0) {
      futureTileValue = node.value + directionX;
      // Calculate this based on heuristic?
      hCost = this.calculateDistanceBetweenTwoTiles(futureTileValue, this.finishTileValue);
      gCost = node.gCost + 1;
      fCost = hCost + gCost;
      // console.log("fCost", fCost);

      // Check out of bounds.
      if ((directionX === -1 && (futureTileValue + 1) % this.matrixWidth === 0) || (directionX === 1 && futureTileValue % this.matrixWidth === 0)) {
        return null;
      }
    } else if (directionY !== 0) {
      futureTileValue = node.value + directionY * this.matrixWidth;
      // Calculate this based on heuristic?
      hCost = this.calculateDistanceBetweenTwoTiles(futureTileValue, this.finishTileValue);
      gCost = node.gCost + 1;
      fCost = hCost + gCost;
      // console.log("fCost", fCost);
    } else {
      return null;
    }

    // Check if we already have a better path to this node
    const existingGCost = this.nodeCosts.get(futureTileValue) ?? Infinity;
    if (gCost >= existingGCost) {
      return null;
    }
    // Update the best known cost
    this.nodeCosts.set(futureTileValue, gCost);

    // Already visited?
    if (this.visitedTiles.has(futureTileValue)) {
      console.log("already visited", futureTileValue);
      return null;
    }

    // Out of matrix bounds.
    if (futureTileValue < 0 || futureTileValue > this.matrixSize - 1) {
      return null;
    }

    // Check if it's blocked. This can be custom fn.
    if (this.matrix1D[futureTileValue] > 0) {
      return null;
    }

    // new MinHeapNode
    return { value: futureTileValue, hCost: hCost, gCost, fCost };
  }
}
