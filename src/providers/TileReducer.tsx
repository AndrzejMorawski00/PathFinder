import { BoardType, TileType, TileReducerAction } from "../types";
import { DEFAULT_BOARD } from "../constants";

const boardReducer = (boardData: BoardType, action: TileReducerAction): BoardType => {
    switch (action.type) {
        case "add": {
            const { width, height } = action;
            const newBoard = [];
            for (let i = 0; i < height; i++) {
                let boardRow: TileType[] = [];
                for (let j = 0; j < width; j++) {
                    boardRow.push({
                        pos: {
                            pos_x: j,
                            pos_y: i,
                        },
                        type: "",
                    });
                }
                newBoard.push(boardRow);
            }
            return {
                ...boardData,
                board: newBoard,
            };
        }

        case "changeStartEnd": {
            const { key, pos_x, pos_y } = action;
            return {
                ...boardData,
                [key]: {
                    pos_x: pos_x,
                    pos_y: pos_y,
                },
            };
        }

        case "changeTile": {
            const { pos_x, pos_y, field, newValue } = action;
            const boardTiles = boardData.board.map((row, idx) => {
                if (idx === pos_y) {
                    return row.map((tile, idx) => {
                        if (idx === pos_x) {
                            return {
                                ...tile,
                                [field]: newValue,
                            };
                        }
                        return tile;
                    });
                }
                return row;
            });
            return { ...boardData, board: boardTiles };
        }

        case "delete": {
            return DEFAULT_BOARD;
        }
    }
};

export default boardReducer;
