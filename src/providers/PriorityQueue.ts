import { Comparator } from "../types";

export class Heap<T> {
    public arr: T[];
    private comparator: Comparator<T>;

    constructor(arr: T[], comparator: Comparator<T>) {
        this.arr = arr;
        this.comparator = comparator;
    }

    public swapElement(i: number, newValue: T): void {
        const oldValue = this.arr[i];
        this.arr[i] = newValue;
        if (this.comparator(newValue, oldValue)) {
            this.moveDown(i, this.arr.length);
        } else {
            this.moveUp(i);
        }
    }

    protected moveDown(i: number, n: number): void {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && this.comparator(this.arr[left], this.arr[largest])) {
            largest = left;
        }

        if (right < n && this.comparator(this.arr[right], this.arr[largest])) {
            largest = right;
        }

        if (largest !== i) {
            [this.arr[i], this.arr[largest]] = [this.arr[largest], this.arr[i]];
            this.moveDown(largest, n);
        }
    }

    protected moveUp(i: number): void {
        while (i > 0 && this.comparator(this.arr[i], this.arr[Math.floor((i - 1) / 2)])) {
            [this.arr[i], this.arr[Math.floor((i - 1) / 2)]] = [this.arr[Math.floor((i - 1) / 2)], this.arr[i]];
            i = Math.floor((i - 1) / 2);
        }
    }

    public buildHeap(): void {
        for (let i = Math.floor(this.arr.length / 2) - 1; i >= 0; i--) {
            this.moveDown(i, this.arr.length);
        }
    }

    public slowBuildHeap(): void {
        for (let i = 2; i < this.arr.length; i++) {
            this.moveUp(i);
        }
    }

    public heapsort(): void {
        const n = this.arr.length;
        this.buildHeap();
        for (let i = n - 1; i >= 0; i--) {
            [this.arr[0], this.arr[i]] = [this.arr[i], this.arr[0]];
            this.moveDown(0, i);
        }
    }

    public getList(): T[] {
        return this.arr;
    }
}

export class PriorityQueue<T> extends Heap<T> {
    constructor(arr: T[], comparator: Comparator<T>) {
        super(arr, comparator);
    }

    public getHead(): T {
        if (this.arr.length > 0) {
            const val = this.arr[0];
            this.deleteHead();
            return val;
        } else {
            throw new Error("Priority Queue is Empty");
        }
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
