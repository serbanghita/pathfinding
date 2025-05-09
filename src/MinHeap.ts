export default class MinHeap {
  public heap: number[] = [];

  public constructor(arr: number[] = []) {
    if (arr.length > 0) {
      this.insertAll(arr);
    }
  }

  public get size(): number {
    return this.heap.length;
  }

  public clear() {
    this.heap = [];
  }

  public includes(nodeValue: number): boolean {
    return this.heap.includes(nodeValue);
  }

  private insertAll(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  }

  public insert(nodeValue: number) {
    const length = this.heap.push(nodeValue);
    this.bubbleUp(nodeValue, length - 1);
  }

  public remove() {
    // Place the root element in a var to return later.
    const root = this.heap[0];
    // Remove the last element in the deepest level and move it to the root.
    const last = this.heap.splice(-1, 1)[0];
    this.heap[0] = last;

    // Swap
    this.bubbleDown(last, 0);

    return root;
  }

  private bubbleDown(nodeValue: number, nodeIndex: number): void {
    // If it's the last node, then stop processing.
    if (nodeIndex === this.heap.length - 1) {
      return;
    }

    const leftChildIndex = nodeIndex * 2 + 1;
    const leftChildValue = this.heap[leftChildIndex];
    const rightChildIndex = nodeIndex * 2 + 2;
    const rightChildValue = this.heap[rightChildIndex];

    if (nodeValue > leftChildValue) {
      this.heap[nodeIndex] = leftChildValue;
      this.heap[leftChildIndex] = nodeValue;
      return this.bubbleDown(nodeValue, leftChildIndex);
    }

    if (nodeValue > rightChildValue) {
      this.heap[nodeIndex] = rightChildValue;
      this.heap[rightChildIndex] = nodeValue;
      return this.bubbleDown(nodeValue, rightChildIndex);
    }
  }

  private bubbleUp(nodeValue: number, nodeIndex: number): void {
    // If it's root node, then stop processing.
    if (nodeIndex === 0) {
      return;
    }

    const parentNodeIndex = nodeIndex > 2 ? Math.floor((nodeIndex - 1) / 2) : 0;
    const parentNodeValue = this.heap[parentNodeIndex];

    if (nodeValue >= parentNodeValue) {
      return;
    }

    // Swap
    this.heap[parentNodeIndex] = nodeValue;
    this.heap[nodeIndex] = parentNodeValue;

    // Repeat the process (until it's stopped).
    this.bubbleUp(nodeValue, parentNodeIndex);
  }
}
