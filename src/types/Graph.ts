import { TilePos } from "./TileTypes";

export type GraphType = Map<string, TilePos[]>;

export type PathFindingFunction = (graph: GraphType, start: TilePos, end: TilePos) => Promise<void>;
