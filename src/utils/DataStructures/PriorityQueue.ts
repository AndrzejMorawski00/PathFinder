import { Comparator } from "../../types/DataStructures";
import { Heap } from "./Heap";

export class PriorityQueue<T> extends Heap<T> {
    constructor(arr: T[], comparator: Comparator<T>) {
        super(arr, comparator);
    }

    public getHead(): T {
        if (this.arr.length === 0) {
            throw new Error("Priority Queue is Empty");
        }
        const val = this.arr[0];
        this.deleteHead();
        return val;
    }

    public deleteHead(): void {
        const listSize = this.arr.length;
        if (listSize === 0) {
            throw new Error("Priority Queue is Empty");
        }
        this.arr[0] = this.arr[listSize - 1];
        this.arr.pop();
        this.moveDown(0, this.arr.length);
    }

    public insertValue(newVal: T): void {
        this.arr.push(newVal);
        this.moveUp(this.arr.length - 1);
    }

    public isEmpty(): boolean {
        return this.arr.length === 0;
    }
}

const isValid = <T>(arr: T[], comparator: (a: T, b: T) => boolean, parent: number): boolean => {
    const left = 2 * parent + 1;
    const right = 2 * parent + 2;
    if (left >= arr.length) {
        return true;
    }

    if (comparator(arr[left], arr[parent])) {
        return false;
    }

    if (right < arr.length && comparator(arr[right], arr[parent])) {
        return false;
    }

    return isValid(arr, comparator, left) && isValid(arr, comparator, right);
};
