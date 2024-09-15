import { TileKey, TilePos, TileType, TileTypes } from "../types/TileTypes";

export const generateNewBoard = (width: number, height: number): TileType[][] => {
    const newBoard: TileType[][] = [];
    for (let i = 0; i < height; i++) {
        let boardRow: TileType[] = Array.from({ length: width }, (_, j) => ({
            pos: {
                pos_x: j,
                pos_y: i,
            },
            type: "",
        }));
        newBoard.push(boardRow);
    }
    return newBoard;
};

export const changeBoardTile = (
    board: TileType[][],
    pos_x: number,
    pos_y: number,
    field: TileKey,
    newValue: TilePos | TileTypes
): TileType[][] => {
    return board.map((row, idx) => {
        if (idx !== pos_y) {
            return row;
        }
        return row.map((tile, idx) => {
            if (idx === pos_x) {
                return { ...tile, [field]: newValue };
            }
            return tile;
        });
    });
};
