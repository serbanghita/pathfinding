# Pathfinding

> Pathfinding library that implements A\* with Euclidean distance.  
> On success it can return the full backtracked path or only the waypoints.

This library provides you with:

- path finding for a map represented by a matrix (1D / flat or 2D).
- path found as `int[]` that can be the **full path** array of tiles or only the **waypoints** tiles (where the direction changes).
- logic can run **in a loop** (step by step, e.g. only 30 times per second) or **continuous** (e.g. Webworker)
- hooks like `onInsertQueue(node)` on `onSuccess`.

| Result type           | Demo                                       |
| --------------------- | ------------------------------------------ |
| `FULL_PATH_ARRAY`     | ![](./resources/pathfinding-fullpath.gif)  |
| `WAYPOINT_PATH_ARRAY` | ![](./resources/pathfinding-waypoints.gif) |

### Install

```
npm install @serbanghita-gamedev/pathfinding
```

### Example

```ts
const aStar = new AStarPathFinding({
  matrix2D: [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  matrixTileSize: 1,
  searchType: AStarPathFindingSearchType.BY_STEP,
  startCoordinates: { x: 0, y: 0 },
  finishCoordinates: { x: 4, y: 2 },
});
// include the following in your loop() fn.
let result = aStar.search();
```

### Config

| Config option     | Type                                   | Description                                                                   |
| ----------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| matrix2D          | `number[][]`                           | A 2d matrix.                                                                  |
| matrix1D          | `number[]`                             | A 1d matrix (flat array).                                                     |
| matrixWidth       | `number`                               | Matrix width, mandatory for `matrix1D`.                                       |
| matrixHeight      | `number`                               | Matrix height, mandatory for `matrix1D`.                                      |
| searchType        | `enum`                                 | `AStarPathFindingSearchType.BY_STEP`, `AStarPathFindingSearchType.CONTINUOUS` |
| startCoordinates  | `{x: number, y: number}`               | Starting point                                                                |
| finishCoordinates | `{x: number, y: number}`               | End goal point                                                                |
| onInsertQueue     | `function(node: MinHeapNode): void`    | Callback function executing for each node inserted in the MinHeap             |
| onSuccess         | `function(foundPath: number[]) : void` | Callback function executing when a successful path has been found.            |

You can use the library in two modes:

- `BY_STEP` - recommended for loops, batches (e.g. game loop). This is when you're executing `aStar.search()` on each tick.
- `CONTINUOUS` - Recommended for separate thread (e.g. WebWorker). This is for when you're executing `aStar.search()` in one blocking operation.

### Contributing

- Always include tests
- Make sure you run `vitest --watch=false --coverage`
- Lint the code with `eslint ./src`
- Open a PR, assign `@serbanghita` as reviewer

### Credits

- [Serban Ghita](https://github.com/serbanghita)
