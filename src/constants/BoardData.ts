import { BoardType } from "../types/tileReducer";

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
