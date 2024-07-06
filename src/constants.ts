import { BoardType } from "./types";

export const MIN_BOARD_WIDTH = 3;
export const MAX_BOARD_WIDTH = 100;
export const MIN_BOARD_HEIGHT = 3;
export const MAX_BOARD_HEIGHT = 100;

export const DEFAULT_BOARD: BoardType = {
    board: [],
    start: {
        pos_x: -1,
        pos_y: -1,
    },
    end: {
        pos_x: -1,
        pos_y: -1,
    },
};

export const ALGORITHM_TYPE_LIST = [`Dijkstra`, "A*", "Greedy BFS"] as const;
export const FIELD_TYPE_LIST = ["start", "end", "obstacle", "visited", "path"] as const;

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
