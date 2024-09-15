import {
    defaultHeuristic,
    euclideanDistance,
    manhattanDistance,
    oneHeuristic,
    weightedManhattanDistance,
} from "../constants/Heuristics";
import { HeuristicFactory } from "../providers/HeuristricFactory";

export const printMessages = (messages: string[]): void => {
    const result: string = messages.map((message, idx) => `${idx + 1}) ${message}`).join("\n");
    alert(result);
};

export const validateBoardSide = (size: number, minVal: number, maxVal: number): boolean => {
    return size >= minVal && size <= maxVal;
};

export const isValidKeyValue = <T extends Object>(s: string, obj: T): boolean => {
    return s in obj;
};

export const createFactory = (): HeuristicFactory => {
    const factory = new HeuristicFactory();
    factory.addHeuristic("zero", defaultHeuristic);
    factory.addHeuristic("one", oneHeuristic);
    factory.addHeuristic("Manhattan Distance", manhattanDistance);
    factory.addHeuristic("Euclidean Distance", euclideanDistance);
    factory.addHeuristic("Weighted Manhattan Distance", weightedManhattanDistance);
    return factory;
};
