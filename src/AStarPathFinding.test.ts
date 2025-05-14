import AStarPathFinding, { AStarPathFindingSearchType } from "./AStarPathFinding.ts";

describe("AStarPathFinding", () => {
  describe("constructor", () => {
    test("constructor - out of bounds startCoordinates x", () => {
      expect(() => {
        new AStarPathFinding({
          matrix2D: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
          ],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 5, y: 0 },
          finishCoordinates: { x: 0, y: 0 },
        });
      }).toThrow(`Out of bounds coordinates: start (5, 0) finish (0, 0)`);
    });
    test("constructor - out of bounds negative startCoordinates x", () => {
      expect(() => {
        new AStarPathFinding({
          matrix2D: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
          ],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: -1, y: 0 },
          finishCoordinates: { x: 0, y: 0 },
        });
      }).toThrow(`Out of bounds coordinates: start (-1, 0) finish (0, 0)`);
    });
    test("constructor - out of bounds startCoordinates y", () => {
      expect(() => {
        new AStarPathFinding({
          matrix2D: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
          ],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: 5 },
          finishCoordinates: { x: 0, y: 0 },
        });
      }).toThrow(`Out of bounds coordinates: start (0, 5) finish (0, 0)`);
    });
    test("constructor - out of bounds negative startCoordinates y", () => {
      expect(() => {
        new AStarPathFinding({
          matrix2D: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
          ],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: -1 },
          finishCoordinates: { x: 0, y: 0 },
        });
      }).toThrow(`Out of bounds coordinates: start (0, -1) finish (0, 0)`);
    });
    test("constructor - out of bounds finishCoordinates x", () => {
      expect(() => {
        new AStarPathFinding({
          matrix2D: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
          ],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: 0 },
          finishCoordinates: { x: 5, y: 0 },
        });
      }).toThrow(`Out of bounds coordinates: start (0, 0) finish (5, 0)`);
    });
    test("constructor - out of bounds negative finishCoordinates x", () => {
      expect(() => {
        new AStarPathFinding({
          matrix2D: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
          ],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: 0 },
          finishCoordinates: { x: -1, y: 0 },
        });
      }).toThrow(`Out of bounds coordinates: start (0, 0) finish (-1, 0)`);
    });
    test("constructor - out of bounds finishCoordinates y", () => {
      expect(() => {
        new AStarPathFinding({
          matrix2D: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
          ],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: 0 },
          finishCoordinates: { x: 0, y: 5 },
        });
      }).toThrow(`Out of bounds coordinates: start (0, 0) finish (0, 5)`);
    });
    test("constructor - out of bounds negative finishCoordinates y", () => {
      expect(() => {
        new AStarPathFinding({
          matrix2D: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0],
          ],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: 0 },
          finishCoordinates: { x: 0, y: -1 },
        });
      }).toThrow(`Out of bounds coordinates: start (0, 0) finish (0, -1)`);
    });
    test("constructor - start and finish tile are calculated", () => {
      const aStar = new AStarPathFinding({
        matrix2D: [
          [0, 1, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 0, 1, 0],
        ],
        searchType: AStarPathFindingSearchType.BY_STEP,
        startCoordinates: { x: 0, y: 1 },
        finishCoordinates: { x: 4, y: 2 },
      });

      expect(aStar.startTileValue).toEqual(5);
      expect(aStar.finishTileValue).toEqual(14);
    });
    test("constructor - empty 1D matrix", () => {
      expect(() => {
        new AStarPathFinding({
          matrix1D: [],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: 0 },
          finishCoordinates: { x: 0, y: 0 },
        });
      }).toThrow(`Please set the matrix before attempting a search.`);
    });
    test("constructor - empty 2D matrix", () => {
      expect(() => {
        new AStarPathFinding({
          matrix2D: [],
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: 0 },
          finishCoordinates: { x: 0, y: 0 },
        });
      }).toThrow(`Please set the matrix before attempting a search.`);
    });
    test("constructor - missing matrices", () => {
      expect(() => {
        new AStarPathFinding({
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: 0 },
          finishCoordinates: { x: 0, y: 0 },
        });
      }).toThrow(`No matrix has been defined.`);
    });
    test("constructor - queue", () => {
      const aStar = new AStarPathFinding({
        matrix2D: [
          [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
          [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
          [0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0],
          [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
          [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
        ],
        searchType: AStarPathFindingSearchType.BY_STEP,
        startCoordinates: { x: 0, y: 0 },
        finishCoordinates: { x: 10, y: 4 },
      });

      expect(aStar.queue.size).toEqual(1);
    });
  });

  describe("search - BY_STEP", () => {
    test("success - 1D matrix - only one path possible", () => {
      const aStar = new AStarPathFinding({
        matrix1D: [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
        matrixWidth: 5,
        matrixHeight: 3,
        searchType: AStarPathFindingSearchType.BY_STEP,
        startCoordinates: { x: 0, y: 0 },
        finishCoordinates: { x: 4, y: 2 },
      });
      let result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2, 3]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2, 3, 4]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2, 3, 4, 9]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2, 3, 4, 9, 14]);
      expect(result).toBe(true);
    });
    test("success - 2D matrix - only one path possible", () => {
      const aStar = new AStarPathFinding({
        matrix2D: [
          [0, 1, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 0, 1, 0],
        ],
        searchType: AStarPathFindingSearchType.BY_STEP,
        startCoordinates: { x: 0, y: 0 },
        finishCoordinates: { x: 4, y: 2 },
      });
      let result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2, 3]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2, 3, 4]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2, 3, 4, 9]);
      expect(result).toBe(false);

      result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2, 3, 4, 9, 14]);
      expect(result).toBe(true);
    });
  });

  describe("search - CONTINUOUS", () => {
    test("success - only one path possible", () => {
      const aStar = new AStarPathFinding({
        matrix2D: [
          [0, 1, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 0, 1, 0],
        ],
        searchType: AStarPathFindingSearchType.CONTINUOUS,
        startCoordinates: { x: 0, y: 0 },
        finishCoordinates: { x: 4, y: 2 },
      });
      const result = aStar.search();
      expect([...aStar.visitedTiles]).toEqual([0, 5, 10, 11, 12, 7, 2, 3, 4, 9, 14]);
      expect(result).toBe(true);
    });
  });

  describe("internal functions", () => {
    describe("20x15 matrix", () => {
      let aStar: AStarPathFinding;
      beforeEach(() => {
        aStar = new AStarPathFinding({
          matrix1D: [
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 5, 5, 5, 5, 0, 5,
            0, 5, 0, 5, 5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 5, 5, 0, 5, 5,
            0, 5, 5, 5, 0, 5, 0, 5, 5, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 5, 5, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 5, 5, 0, 0, 0, 0, 5, 0, 5,
            5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 0, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0,
            5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          matrixWidth: 20,
          matrixHeight: 15,
          searchType: AStarPathFindingSearchType.BY_STEP,
          startCoordinates: { x: 0, y: 0 },
          finishCoordinates: { x: 4, y: 2 },
        });
      });
      test("getTileValueFromCoordinates", () => {
        expect(aStar.getTileValueFromCoordinates(0, 0)).toEqual(0);
        expect(aStar.getTileValueFromCoordinates(1, 0)).toEqual(1);
        expect(aStar.getTileValueFromCoordinates(19, 0)).toEqual(19);
        expect(aStar.getTileValueFromCoordinates(19, 1)).toEqual(39);
        expect(aStar.getTileValueFromCoordinates(19, 14)).toEqual(299);
      });
      test("getCoordinatesFromTileValue", () => {
        expect(aStar.getCoordinatesFromTileValue(0)).toEqual({ x: 0, y: 0 });
        expect(aStar.getCoordinatesFromTileValue(1)).toEqual({ x: 1, y: 0 });
        expect(aStar.getCoordinatesFromTileValue(19)).toEqual({ x: 19, y: 0 });
        expect(aStar.getCoordinatesFromTileValue(39)).toEqual({ x: 19, y: 1 });
        expect(aStar.getCoordinatesFromTileValue(299)).toEqual({
          x: 19,
          y: 14,
        });
      });
      test("computeEuclideanDistanceBetweenTwoTiles", () => {});
    });
  });
});
