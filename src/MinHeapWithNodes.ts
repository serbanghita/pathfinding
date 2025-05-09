export type MinHeapNode = {
  value: number;
  cost: number;
};

export default class MinHeapWithNodes {
  public heap: MinHeapNode[] = [];

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
    return !!this.heap.find((node) => node.value === nodeValue);
  }

  private insertAll(arr: MinHeapNode[]) {
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  }

  public insert(node: MinHeapNode) {
    const length = this.heap.push(node);
    this.bubbleUp(node, length - 1);
  }

  public remove() {
    // Place the root element in a var to return later.
    const root = this.heap[0];
    const last = this.heap.splice(-1, 1)[0];

    if (this.heap.length > 0) {
      // Remove the last element in the deepest level and move it to the root.
      this.heap[0] = last;
    }

    // Swap
    this.bubbleDown(last, 0);

    return root;
  }

  private bubbleDown(node: MinHeapNode, nodeIndex: number): void {
    // If it's the last node, then stop processing.
    if (nodeIndex === this.heap.length - 1) {
      return;
    }

    const leftChildIndex = nodeIndex * 2 + 1;
    const leftChild = this.heap[leftChildIndex];
    const rightChildIndex = nodeIndex * 2 + 2;
    const rightChild = this.heap[rightChildIndex];

    if (leftChild && node.cost > leftChild.cost) {
      // Swap nodes.
      this.heap[nodeIndex] = leftChild;
      this.heap[leftChildIndex] = node;
      return this.bubbleDown(this.heap[leftChildIndex], leftChildIndex);
    }

    if (rightChild && node.cost > rightChild.cost) {
      // Swap nodes.
      this.heap[nodeIndex] = rightChild;
      this.heap[rightChildIndex] = node;
      return this.bubbleDown(this.heap[rightChildIndex], rightChildIndex);
    }
  }

  private bubbleUp(node: MinHeapNode, nodeIndex: number): void {
    // If it's root node, then stop processing.
    if (nodeIndex === 0) {
      return;
    }

    const parentNodeIndex = nodeIndex > 2 ? Math.floor((nodeIndex - 1) / 2) : 0;
    const parentNode = this.heap[parentNodeIndex];

    if (node.cost >= parentNode.cost) {
      return;
    }

    // Swap
    this.heap[parentNodeIndex] = node;
    this.heap[nodeIndex] = parentNode;

    // Repeat the process (until it's stopped).
    this.bubbleUp(this.heap[parentNodeIndex], parentNodeIndex);
  }
}
