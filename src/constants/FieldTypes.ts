export const FIELD_TYPES = ["start", "end", "obstacle", "visited", "path"] as const;

const RESET_BOARD_INDEX_LIST = [3, 4];
const CLEAR_BOARD_INDEX_LIST = [2, 3, 4];
const HEADER_BOARD_INDEX_LIST = [0, 1, 2];

export const RESET_FIELD_TYPES = Array.from(RESET_BOARD_INDEX_LIST, (idx) => FIELD_TYPES[idx]);
export const CLEAR_FIELD_TYPES = Array.from(CLEAR_BOARD_INDEX_LIST, (idx) => FIELD_TYPES[idx]);
export const HEADER_FIELD_TYPES = Array.from(HEADER_BOARD_INDEX_LIST, (idx) => FIELD_TYPES[idx]);
