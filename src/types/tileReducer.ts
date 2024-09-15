import { TileKey, TilePos, TileType } from "./TileTypes";

export type TileReducerAction =
    | { type: "add"; width: number; height: number }
    | { type: "changeTile"; pos_x: number; pos_y: number; field: TileKey; newValue: TileType[TileKey] }
    | { type: "changeStartEnd"; key: StartEndKey; pos_x: number; pos_y: number }
    | { type: "delete" };

export type BoardType = {
    board: TileType[][];
    start: TilePos;
    end: TilePos;
};

export type StartEndKey = Exclude<keyof BoardType, "board" | "graph">;
