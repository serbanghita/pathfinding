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
});
