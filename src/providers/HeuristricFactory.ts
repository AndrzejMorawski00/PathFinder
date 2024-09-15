import { Heuristic } from "../types";

export class HeuristicFactory {
    private heuristicDict: Map<string, Heuristic>;
    constructor() {
        this.heuristicDict = new Map();
    }

    public getHeuristic(heuristicName: string) {
        const heuristic = this.heuristicDict.get(heuristicName);
        if (heuristic === undefined) {
            throw new Error("Invalid Heuristic Name");
        }
        return heuristic;
    }

    public addHeuristic(heuristicName: string, heuristic: Heuristic) {
        if (this.heuristicDict.get(heuristicName)) {
            throw new Error("Heuresic is already in dict");
        }
        this.heuristicDict.set(heuristicName, heuristic);
    }
}
