import { AnimationSpeed, MOVES } from "../constants/GraphAlgorithm";
import { PriorityQueueItem } from "../types/AlgorithmTypes";
import { Comparator } from "../types/DataStructures";
import { GraphType } from "../types/Graph";
import { TilePos, TileType } from "../types/TileTypes";

export const TileComparator: Comparator<PriorityQueueItem> = (a, b): boolean => {
    return a[0] < b[0];
};

export const isValidMove = (field: number, minVal: number, maxVal: number) => {
    return minVal < field && field < maxVal;
};

export const isValidField = (pos_x: number, pos_y: number, field: TilePos) => {
    return !(pos_x == field.pos_x && pos_y == field.pos_y);
};

export const getDelay = (width: number, height: number): AnimationSpeed => {
    const tilesCount = width * height;
    if (tilesCount >= 5000) {
        return AnimationSpeed.ULTRA_FAST;
    } else if (tilesCount >= 3000) {
        return AnimationSpeed.SUPER_FAST;
    } else if (tilesCount >= 2000) {
        return AnimationSpeed.FAST;
    } else if (tilesCount >= 1000) {
        return AnimationSpeed.MEDIUM;
    }
    return AnimationSpeed.SLOW;
};

export const delay = (ms: AnimationSpeed | number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getValidMoves = (board: TileType[][], currPos: TilePos, boardLen: number, rowLen: number) => {
    const validMoves = MOVES.map((move) => ({ pos_x: currPos.pos_x + move[1], pos_y: currPos.pos_y + move[0] })).filter(
        (move) =>
            isValidMove(move.pos_x, -1, rowLen) &&
            isValidMove(move.pos_y, -1, boardLen) &&
            board[move.pos_y][move.pos_x].type !== "obstacle"
    );
    return validMoves;
};

export const generateGraph = (board: TileType[][]): GraphType => {
    const graphMap: GraphType = new Map<string, TilePos[]>();
    board.forEach((row) => {
        row.forEach((tile) => {
            if (tile.type === "obstacle") {
                return;
            }
            const currPos = tile.pos;
            const JSONPos = JSON.stringify(currPos);
            graphMap.set(JSONPos, getValidMoves(board, currPos, board.length, row.length));
        });
    });

    return graphMap;
};

export const findPath = (end: TilePos, prev: Map<string, string>): [string[], boolean] => {
    const path: string[] = [];
    let currItem = JSON.stringify(end);

    while (prev.has(currItem)) {
        path.push(currItem);
        currItem = prev.get(currItem)!;
    }
    return [path.reverse(), path.length > 0];
};

export const findShortestPath = (
    end: TilePos,
    prev: Map<string, string>,
    distances: Map<string, number>
): [string[], boolean] => {
    const path: string[] = [];
    let currItem = JSON.stringify(end);
    while (prev.has(currItem) && distances.get(currItem) !== undefined && distances.get(currItem) !== Infinity) {
        path.push(currItem);
        currItem = prev.get(currItem)!;
    }
    return [path.reverse(), path.length > 0];
};
