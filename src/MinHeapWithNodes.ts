export type MinHeapNode = {
  value: number;
  // Heuristic cost (Manhattan/Euclidean/etc). This is the cost from this node to this goal node.
  hCost: number;
  // Cost from the start.
  gCost: number;
  // f = g + h (MinHeap should care about this)
  fCost: number;
};

/**
 * Min heap structure where a Node has "value" and "cost"
 * where "value" is the tile index and the "cost" is calculated based on
 * the Pathfinding heuristic (Manhattan or Euclidean distance).
 */
export default class MinHeapWithNodes {
  public heap: MinHeapNode[] = [];
  public nodeValueSet: Set<number> = new Set();

  public constructor(arr: MinHeapNode[] = []) {
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
    return this.nodeValueSet.has(nodeValue);
  }

  private insertAll(arr: MinHeapNode[]) {
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  }

  public insert(node: MinHeapNode) {
    const length = this.heap.push(node);
    // Add the node value to the "valueSet" in order to have O(1) access to the
    // "exiting value check" later.
    this.nodeValueSet.add(node.value);
    this.bubbleUp(length - 1);
  }

  public remove() {
    // Place the root element in a var to return later.
    const root = this.heap[0];
    const last = this.heap.splice(-1, 1)[0];

    // Delete the value from the "valueSet" so we don't falsely report it in "include" fn.
    this.nodeValueSet.delete(root.value);

    if (this.heap.length > 0) {
      // Remove the last element in the deepest level and move it to the root.
      this.heap[0] = last;
    }

    // Swap
    this.bubbleDown(0);

    return root;
  }

  private bubbleDown(nodeIndex: number): void {
    while (true) {
      const leftChildIndex = nodeIndex * 2 + 1;
      const rightChildIndex = nodeIndex * 2 + 2;

      let smallest = nodeIndex;

      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].fCost < this.heap[smallest].fCost) {
        smallest = leftChildIndex;
      }

      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].fCost < this.heap[smallest].fCost) {
        smallest = rightChildIndex;
      }

      if (smallest === nodeIndex) break;

      // Swap
      [this.heap[nodeIndex], this.heap[smallest]] = [this.heap[smallest], this.heap[nodeIndex]];
      nodeIndex = smallest;
    }
  }

  private bubbleUp(nodeIndex: number): void {
    // If it's root node, then stop processing.
    if (nodeIndex === 0) {
      return;
    }

    const parentNodeIndex = nodeIndex > 2 ? Math.floor((nodeIndex - 1) / 2) : 0;

    if (this.heap[nodeIndex].fCost >= this.heap[parentNodeIndex].fCost) {
      return;
    }

    // Swap
    [this.heap[parentNodeIndex], this.heap[nodeIndex]] = [this.heap[nodeIndex], this.heap[parentNodeIndex]];

    // Repeat the process (until it's stopped).
    this.bubbleUp(parentNodeIndex);
  }
}
