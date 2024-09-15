import { FIELD_TYPES } from "../constants/FieldTypes";

export type TileTypes = (typeof FIELD_TYPES)[number] | "";

export type TilePos = {
    pos_x: number;
    pos_y: number;
};

export type TileType = {
    pos: TilePos;
    type: TileTypes;
};

export type TileKey = Exclude<keyof TileType, "TilePos">;
