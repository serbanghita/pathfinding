# Pathfinding

## Overview

A\* pathfinding library supporting continuous or step-by-step search on 2D grids. Returns full paths or waypoint-only paths with configurable distance heuristics.

## Source Structure

| File                      | Description                                                       |
| ------------------------- | ----------------------------------------------------------------- |
| `src/AStarPathFinding.ts` | Core A\* algorithm: continuous and by-step search modes           |
| `src/MinHeapWithNodes.ts` | Min-heap optimized for A\* with O(1) existence checks via Set     |
| `src/DistanceStrategy.ts` | Distance strategy interface + Euclidean/Manhattan implementations |
| `src/utils.ts`            | Utility functions (`isNumber`)                                    |
| `src/index.ts`            | Public API re-exports                                             |

## Key Exports

| Export                         | Type      | Description                               |
| ------------------------------ | --------- | ----------------------------------------- |
| `AStarPathFinding`             | Class     | Core A\* pathfinding algorithm            |
| `AStarPathFindingSearchType`   | Enum      | `CONTINUOUS`, `BY_STEP`                   |
| `AStarPathFindingResultType`   | Enum      | `FULL_PATH_ARRAY`, `WAYPOINT_PATH_ARRAY`  |
| `AStarPathFindingSearchStatus` | Enum      | `INIT`, `SEARCHING`, `FOUND`, `NOT_FOUND` |
| `AStarPathFindingInit`         | Type      | Configuration object for initialization   |
| `MatrixTileCoordinates`        | Type      | `{ x, y }` tile coordinates               |
| `MinHeapNode`                  | Type      | Heap node with value, gCost, hCost, fCost |
| `DistanceStrategy`             | Interface | `calculate(start, finish): number`        |
| `EuclideanDistance`            | Class     | Euclidean distance heuristic              |
| `ManhattanDistance`            | Class     | Manhattan distance heuristic              |

## Dependencies

None (standalone library).

## Development

| Command         | What it does                                |
| --------------- | ------------------------------------------- |
| `npm install`   | Install dependencies                        |
| `npm run build` | Bundle with esbuild                         |
| `npm run test`  | Run tests with coverage (vitest + istanbul) |
| `npm run lint`  | Lint (eslint)                               |

## Testing

- Framework: Vitest with Istanbul coverage
- Tests: `src/AStarPathFinding.test.ts`, `src/MinHeapWithNodes.test.ts`, `src/DistanceStrategy.test.ts`

## Coding Guidelines

- Consider algorithmic complexity when suggesting changes.
- Avoid unnecessary comments in code.
- Keep the library dependency-free.
