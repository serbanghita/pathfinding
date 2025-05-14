import MinHeap from "./MinHeap.ts";

describe("MinHeap", () => {
  it("constructor", () => {
    const mh = new MinHeap([10, 1, 7, 3, 8, 5, 9]);
    expect(mh.heap).toEqual([1, 3, 5, 10, 8, 7, 9]);
  });

  it("constructor - arr ordered", () => {
    const mh = new MinHeap([1, 2, 3, 4, 5, 6, 7]);
    expect(mh.heap).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("insert", () => {
    const mh = new MinHeap([]);
    mh.insert(1);
    expect(mh.heap).toEqual([1]);
    mh.insert(10);
    expect(mh.heap).toEqual([1, 10]);
    mh.insert(5);
    expect(mh.heap).toEqual([1, 10, 5]);
    mh.insert(4);
    expect(mh.heap).toEqual([1, 4, 5, 10]);
  });

  it("remove", () => {
    const mh = new MinHeap([1, 10, 5, 4]);
    mh.remove();
    expect(mh.heap).toEqual([4, 10, 5]);
  });
});
