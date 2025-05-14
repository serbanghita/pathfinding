import MinHeapWithNodes from "./MinHeapWithNodes.ts";

describe("MinHeapWithNodes", () => {
  it("constructor", () => {
    const mh = new MinHeapWithNodes([
      { value: 0x1, cost: 10 },
      { value: 0x2, cost: 1 },
      { value: 0x3, cost: 7 },
      { value: 0x4, cost: 3 },
      { value: 0x5, cost: 8 },
      { value: 0x6, cost: 5 },
      { value: 0x7, cost: 9 },
    ]);
    expect(mh.heap).toEqual([
      { value: 0x2, cost: 1 },
      { value: 0x4, cost: 3 },
      { value: 0x6, cost: 5 },
      { value: 0x1, cost: 10 },
      { value: 0x5, cost: 8 },
      { value: 0x3, cost: 7 },
      { value: 0x7, cost: 9 },
    ]);
  });

  it("constructor - arr ordered", () => {
    const mh = new MinHeapWithNodes([
      { value: 0x1, cost: 1 },
      { value: 0x2, cost: 2 },
      { value: 0x3, cost: 3 },
      { value: 0x4, cost: 4 },
      { value: 0x5, cost: 5 },
      { value: 0x6, cost: 6 },
      { value: 0x7, cost: 7 },
    ]);
    expect(mh.heap).toEqual([
      { value: 0x1, cost: 1 },
      { value: 0x2, cost: 2 },
      { value: 0x3, cost: 3 },
      { value: 0x4, cost: 4 },
      { value: 0x5, cost: 5 },
      { value: 0x6, cost: 6 },
      { value: 0x7, cost: 7 },
    ]);
  });

  it("insert", () => {
    const mh = new MinHeapWithNodes([]);
    mh.insert({ value: 0x1, cost: 1 });
    expect(mh.heap).toEqual([{ value: 0x1, cost: 1 }]);
    mh.insert({ value: 0x2, cost: 10 });
    expect(mh.heap).toEqual([
      { value: 0x1, cost: 1 },
      { value: 0x2, cost: 10 },
    ]);
    mh.insert({ value: 0x3, cost: 5 });
    expect(mh.heap).toEqual([
      { value: 0x1, cost: 1 },
      { value: 0x2, cost: 10 },
      { value: 0x3, cost: 5 },
    ]);
    mh.insert({ value: 0x4, cost: 4 });
    expect(mh.heap).toEqual([
      { value: 0x1, cost: 1 },
      { value: 0x4, cost: 4 },
      { value: 0x3, cost: 5 },
      { value: 0x2, cost: 10 },
    ]);
  });

  it("remove", () => {
    const mh = new MinHeapWithNodes([
      { value: 0x1, cost: 1 },
      { value: 0x2, cost: 10 },
      { value: 0x3, cost: 5 },
      { value: 0x4, cost: 4 },
    ]);
    mh.remove();
    expect(mh.heap).toEqual([
      { value: 0x4, cost: 4 },
      { value: 0x2, cost: 10 },
      { value: 0x3, cost: 5 },
    ]);
  });
});
