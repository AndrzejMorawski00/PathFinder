import { FIELD_TYPE } from "./constants";

export type TileTypes = (typeof FIELD_TYPE)[number] | "";

export type TileType = {
    pos: TilePos;
    type: TileTypes;
};

export type BoardType = {
    board: TileType[][];
    start: TilePos;
    end: TilePos;
    graph: GraphType;
};

export type TilePos = {
    pos_x: number;
    pos_y: number;
};

export type GraphType = Map<string, TilePos[]>;

export type TileKey = Exclude<keyof TileType, "TilePos">;
export type StartEndKey = Exclude<keyof BoardType, "board" | "graph">;

export type TileReducerAction =
    | { type: "add"; width: number; height: number }
    | { type: "changeTile"; pos_x: number; pos_y: number; field: TileKey; newValue: TileType[TileKey] }
    | { type: "changeStartEnd"; key: StartEndKey; pos_x: number; pos_y: number }
    | { type: "delete" };

export type Comparator<T> = (a: T, b: T) => boolean;
export type Heurestic = (a: TilePos, b: TilePos) => number;
