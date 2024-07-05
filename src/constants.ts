import { BoardType } from "./types";

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
    graph: new Map(),
};

export const ALGORITHM_LIST = ["", `Dijkstra's algorithm`, "A* search algorithm"];
export const FIELD_TYPE = ["start", "end", "obstacle", "visited", 'path'] as const;
