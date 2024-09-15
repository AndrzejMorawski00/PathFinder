import { TilePos } from "./TileTypes";

export type Heuristic = (a: TilePos, b: TilePos) => number;
