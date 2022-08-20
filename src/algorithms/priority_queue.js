/* Making my own Priority Queue (min-heap) class for graph nodes. Priority is based on distance */

class PriorityQueue {
    constructor() {
        this.contents = [];
        this.contents.push(null)
    }
    // ESSENTIAL METHODS

    /* Indicates whether this priority queue is empty or not. */
    is_empty() {
        return this.size() == 0;
    }
    /* Returns the item with the smallest priority value. Does not modify the priority queue. */
    peek() {
        return this.getNode(1);
    }
    /* Inserts an node into the priority queue. */
    insert(item) {
        const new_index = this.size() + 1;
        this.setNode(new_index, item);
        this.bubbleUp(new_index);
    }

    /* Pops off the node with the highest priority, ie the smallest distance attribute. */
    pop() {
        if (this.size() == 0) {
            return null;
        }
        this.swap(1, this.size()); // Swap the first and last node
        const min_node = this.removeNode(this.size()); // Remove first node from the priority queue
        this.bubbleDown(1);
        return min_node;
    }

    /* Updates the DISTANCE attribute for NODE, then refreshes the priority queue to reflect 
    the changed priority value for NODE. */
    updatePriority(node, distance) {
        node.distance = distance;
        for (let i = 1; i <= this.size(); i++) {
            if (this.getNode(i) == node) {
                this.bubbleUp(i);
                this.bubbleDown(i);
                return;
            }
        }
    }

    // HELPER METHODS

    /* Returns the number of elements in this priority queue. */
    size() {
        return this.contents.length - 1;
    }

    /* Returns the node at the given INDEX, if it exists. */
    getNode(index) {
        if (index > this.size()) {
            return null;
        }
        return this.contents[index];
    }

    /* Sets the given INDEX of the priority queue to NODE. */
    setNode(index, node) {
        while (index > this.size()) {
            this.contents.push(null);
        }
        // Now, there's for sure at least INDEX elements in the array
        this.contents[index] = node;
    }

    /* Removes and returns the node at INDEX */
    removeNode(index) {
        if (index > this.size()) {
            return null;
        }
        const removed = this.contents.splice(index, 1);
        return removed[0];
    }

    /* Swaps the nodes at the two indices. */
    swap(index1, index2) {
        const node1 = this.getNode(index1);
        const node2 = this.getNode(index2);
        this.setNode(index1, node2);
        this.setNode(index2, node1);
    }

    /* Returns the index of the left child of the node at INDEX. */
    getLeftOf(index) {
        return index * 2;
    }

    /* Returns the index of the right child of the node at INDEX. */
    getRightOf(index) {
        return index * 2 + 1;
    }

    /* Returns the index of the node that is the parent of the node at INDEX. */
    getParent(index) {
        return Math.floor(index / 2);
    }

    /* Bubbles up the node currently at the given INDEX until no longer needed. */
    bubbleUp(index) {
        const parentIndex = getParent(index);
        if (this.getNode(parentIndex) != 0 && this.getNode(index).distance < this.getNode(parent).distance) {
            this.swap(index, parentIndex);
            this.bubbleUp(parentIndex);
        }
    }

    /* Bubbles down the node currently at the given INDEX until no longer needed. */
    bubbleDown(index) {
        const curr = this.getNode(index);
        const left = this.getNode(this.getLeftOf(index));
        const right = this.getNode(this.getRightOf(index));
        if (left == null && right == null) { // No children
            return;
        } else if (left == null) { // Only right child
            if (curr.distance > right.distance) {
                this.swap(index, this.getRight(index));
                this.bubbleDown(this.getRightOf(index));
            }
        } else if (right == null) { // Only left child
            if (curr.distance > left.distance) {
                this.swap(index, this.getLeftOf(index));
                this.bubbleDown(this.getLeftOf(index));
            }
        } else if (curr.distance > left.distance || curr.distance > right.distance) { // Both children exist, swap needed
            if (left.distance < right.distance) {
                this.swap(index, this.getLeftOf(index));
                this.bubbleDown(this.getLeftOf(index));
            } else {
                this.swap(index, this.getRightOf(index));
                this.bubbleDown(this.getRightOf(index));
            }
        }

    }

    
}