import MinHeapWithNodes from "./MinHeapWithNodes.ts";

describe("MinHeapWithNodes", () => {
  it("constructor", () => {
    const mh = new MinHeapWithNodes([
      { value: 0x1, fCost: 10, hCost: 0, gCost: 0 },
      { value: 0x2, fCost: 1, hCost: 0, gCost: 0 },
      { value: 0x3, fCost: 7, hCost: 0, gCost: 0 },
      { value: 0x4, fCost: 3, hCost: 0, gCost: 0 },
      { value: 0x5, fCost: 8, hCost: 0, gCost: 0 },
      { value: 0x6, fCost: 5, hCost: 0, gCost: 0 },
      { value: 0x7, fCost: 9, hCost: 0, gCost: 0 },
    ]);
    expect(mh.heap).toEqual([
      { value: 0x2, fCost: 1, hCost: 0, gCost: 0 },
      { value: 0x4, fCost: 3, hCost: 0, gCost: 0 },
      { value: 0x6, fCost: 5, hCost: 0, gCost: 0 },
      { value: 0x1, fCost: 10, hCost: 0, gCost: 0 },
      { value: 0x5, fCost: 8, hCost: 0, gCost: 0 },
      { value: 0x3, fCost: 7, hCost: 0, gCost: 0 },
      { value: 0x7, fCost: 9, hCost: 0, gCost: 0 },
    ]);
  });

  it("constructor - arr ordered", () => {
    const mh = new MinHeapWithNodes([
      { value: 0x1, fCost: 1, hCost: 0, gCost: 0 },
      { value: 0x2, fCost: 2, hCost: 0, gCost: 0 },
      { value: 0x3, fCost: 3, hCost: 0, gCost: 0 },
      { value: 0x4, fCost: 4, hCost: 0, gCost: 0 },
      { value: 0x5, fCost: 5, hCost: 0, gCost: 0 },
      { value: 0x6, fCost: 6, hCost: 0, gCost: 0 },
      { value: 0x7, fCost: 7, hCost: 0, gCost: 0 },
    ]);
    expect(mh.heap).toEqual([
      { value: 0x1, fCost: 1, hCost: 0, gCost: 0 },
      { value: 0x2, fCost: 2, hCost: 0, gCost: 0 },
      { value: 0x3, fCost: 3, hCost: 0, gCost: 0 },
      { value: 0x4, fCost: 4, hCost: 0, gCost: 0 },
      { value: 0x5, fCost: 5, hCost: 0, gCost: 0 },
      { value: 0x6, fCost: 6, hCost: 0, gCost: 0 },
      { value: 0x7, fCost: 7, hCost: 0, gCost: 0 },
    ]);
  });

  it("insert", () => {
    const mh = new MinHeapWithNodes([]);
    mh.insert({ value: 0x1, fCost: 1, hCost: 0, gCost: 0 });
    expect(mh.heap).toEqual([{ value: 0x1, fCost: 1, hCost: 0, gCost: 0 }]);
    mh.insert({ value: 0x2, fCost: 10, hCost: 0, gCost: 0 });
    expect(mh.heap).toEqual([
      { value: 0x1, fCost: 1, hCost: 0, gCost: 0 },
      { value: 0x2, fCost: 10, hCost: 0, gCost: 0 },
    ]);
    mh.insert({ value: 0x3, fCost: 5, hCost: 0, gCost: 0 });
    expect(mh.heap).toEqual([
      { value: 0x1, fCost: 1, hCost: 0, gCost: 0 },
      { value: 0x2, fCost: 10, hCost: 0, gCost: 0 },
      { value: 0x3, fCost: 5, hCost: 0, gCost: 0 },
    ]);
    mh.insert({ value: 0x4, fCost: 4, hCost: 0, gCost: 0 });
    expect(mh.heap).toEqual([
      { value: 0x1, fCost: 1, hCost: 0, gCost: 0 },
      { value: 0x4, fCost: 4, hCost: 0, gCost: 0 },
      { value: 0x3, fCost: 5, hCost: 0, gCost: 0 },
      { value: 0x2, fCost: 10, hCost: 0, gCost: 0 },
    ]);
  });

  it("clear - clears both heap and nodeValueSet", () => {
    const mh = new MinHeapWithNodes([
      { value: 0x1, fCost: 1, hCost: 0, gCost: 0 },
      { value: 0x2, fCost: 10, hCost: 0, gCost: 0 },
      { value: 0x3, fCost: 5, hCost: 0, gCost: 0 },
    ]);
    expect(mh.heap.length).toBe(3);
    expect(mh.includes(0x1)).toBe(true);
    expect(mh.includes(0x2)).toBe(true);
    expect(mh.includes(0x3)).toBe(true);

    mh.clear();

    expect(mh.heap.length).toBe(0);
    expect(mh.size).toBe(0);
    expect(mh.includes(0x1)).toBe(false);
    expect(mh.includes(0x2)).toBe(false);
    expect(mh.includes(0x3)).toBe(false);
  });

  it("remove", () => {
    const mh = new MinHeapWithNodes([
      { value: 0x1, fCost: 1, hCost: 0, gCost: 0 },
      { value: 0x2, fCost: 10, hCost: 0, gCost: 0 },
      { value: 0x3, fCost: 5, hCost: 0, gCost: 0 },
      { value: 0x4, fCost: 4, hCost: 0, gCost: 0 },
    ]);
    mh.remove();
    expect(mh.heap).toEqual([
      { value: 0x4, fCost: 4, hCost: 0, gCost: 0 },
      { value: 0x2, fCost: 10, hCost: 0, gCost: 0 },
      { value: 0x3, fCost: 5, hCost: 0, gCost: 0 },
    ]);
  });

  it("insert and constructor - equal fCost prioritizes smaller hCost", () => {
    const nodes = [
      { value: 0x1, hCost: 8, gCost: 2, fCost: 10 },
      { value: 0x2, hCost: 5, gCost: 5, fCost: 10 },
      { value: 0x3, hCost: 3, gCost: 7, fCost: 10 },
    ];

    const inserted = new MinHeapWithNodes();
    for (const node of nodes) {
      inserted.insert(node);
    }
    expect(inserted.heap[0]).toEqual({ value: 0x3, hCost: 3, gCost: 7, fCost: 10 });

    const constructed = new MinHeapWithNodes(nodes);
    expect(constructed.heap[0]).toEqual({ value: 0x3, hCost: 3, gCost: 7, fCost: 10 });
  });

  it("remove - equal fCost prioritizes smaller hCost, fCost takes precedence", () => {
    const leftBranch = new MinHeapWithNodes([
      { value: 0x1, hCost: 0, gCost: 5, fCost: 5 },
      { value: 0x2, hCost: 2, gCost: 8, fCost: 10 },
      { value: 0x3, hCost: 5, gCost: 5, fCost: 10 },
      { value: 0x4, hCost: 9, gCost: 1, fCost: 10 },
    ]);
    leftBranch.remove();
    expect(leftBranch.heap[0]).toEqual({ value: 0x2, hCost: 2, gCost: 8, fCost: 10 });

    const rightBranch = new MinHeapWithNodes([
      { value: 0x1, hCost: 0, gCost: 5, fCost: 5 },
      { value: 0x2, hCost: 5, gCost: 5, fCost: 10 },
      { value: 0x3, hCost: 2, gCost: 8, fCost: 10 },
      { value: 0x4, hCost: 9, gCost: 1, fCost: 10 },
    ]);
    rightBranch.remove();
    expect(rightBranch.heap[0]).toEqual({ value: 0x3, hCost: 2, gCost: 8, fCost: 10 });

    const drained = new MinHeapWithNodes([
      { value: 0x1, hCost: 4, gCost: 6, fCost: 10 },
      { value: 0x2, hCost: 7, gCost: 3, fCost: 10 },
      { value: 0x3, hCost: 1, gCost: 9, fCost: 10 },
      { value: 0x4, hCost: 6, gCost: 4, fCost: 10 },
      { value: 0x5, hCost: 2, gCost: 8, fCost: 10 },
      { value: 0x6, hCost: 5, gCost: 5, fCost: 10 },
      { value: 0x7, hCost: 3, gCost: 7, fCost: 10 },
    ]);
    const drainedHCosts: number[] = [];
    while (drained.heap.length > 0) {
      drainedHCosts.push(drained.remove().hCost);
    }
    expect(drainedHCosts).toEqual([1, 2, 3, 4, 5, 6, 7]);

    const precedence = new MinHeapWithNodes([
      { value: 0x1, hCost: 1, gCost: 9, fCost: 10 },
      { value: 0x2, hCost: 100, gCost: -95, fCost: 5 },
    ]);
    expect(precedence.remove()).toEqual({ value: 0x2, hCost: 100, gCost: -95, fCost: 5 });
    expect(precedence.remove()).toEqual({ value: 0x1, hCost: 1, gCost: 9, fCost: 10 });
  });

  it("remove - full ties on fCost and hCost drain without error", () => {
    const mh = new MinHeapWithNodes([
      { value: 0x1, hCost: 5, gCost: 5, fCost: 10 },
      { value: 0x2, hCost: 5, gCost: 5, fCost: 10 },
      { value: 0x3, hCost: 5, gCost: 5, fCost: 10 },
      { value: 0x4, hCost: 5, gCost: 5, fCost: 10 },
      { value: 0x5, hCost: 5, gCost: 5, fCost: 10 },
    ]);
    const drainedValues: number[] = [];
    while (mh.heap.length > 0) {
      const node = mh.remove();
      expect(node.fCost).toBe(10);
      expect(node.hCost).toBe(5);
      drainedValues.push(node.value);
    }
    expect(drainedValues.sort()).toEqual([0x1, 0x2, 0x3, 0x4, 0x5]);
    expect(mh.heap).toEqual([]);
  });
});
