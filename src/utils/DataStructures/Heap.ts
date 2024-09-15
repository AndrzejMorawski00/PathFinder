import { Comparator } from "../../types/DataStructures";

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
        let parentIndex = Math.floor((i - 1) / 2);
        while (i > 0 && this.comparator(this.arr[i], this.arr[parentIndex])) {
            parentIndex = Math.floor((i - 1) / 2);
            [this.arr[i], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[i]];
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
