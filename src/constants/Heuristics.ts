import { TilePos } from "../types/TileTypes";

export const defaultHeuristic = (_pos1: TilePos, _pos2: TilePos): number => {
    return 0;
};

export const oneHeuristic = (_pos1: TilePos, _pos2: TilePos): number => {
    return 1;
};

export const manhattanDistance = (pos1: TilePos, pos2: TilePos): number => {
    return Math.abs(pos1.pos_x - pos2.pos_x) + Math.abs(pos1.pos_y - pos2.pos_y);
};

export const euclideanDistance = (pos1: TilePos, pos2: TilePos): number => {
    return Math.sqrt(Math.pow(pos1.pos_x - pos2.pos_x, 2) + Math.pow(pos1.pos_y - pos2.pos_y, 2));
};

export const weightedManhattanDistance = (pos1: TilePos, pos2: TilePos): number => {
    const dx = Math.abs(pos1.pos_x - pos2.pos_x);
    const dy = Math.abs(pos1.pos_y - pos2.pos_y);
    const D = 1; // Cost for moving in the same row/column
    const D2 = 1.4; // Cost for moving diagonally
    return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
};

export const AlgorithmHeuristics = new Map<string, { default: string; list: string[] }>();

AlgorithmHeuristics.set("Dijkstra", {
    default: "zero",
    list: [],
});

AlgorithmHeuristics.set("A*", {
    default: "one",
    list: ["Manhattan Distance", "Euclidean Distance", "Weighted Manhattan Distance"],
});

AlgorithmHeuristics.set("Greedy BFS", {
    default: "one",
    list: ["Manhattan Distance", "Euclidean Distance", "Weighted Manhattan Distance"],
});
