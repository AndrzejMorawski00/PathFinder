import { DEFAULT_BOARD } from "../constants/BoardData";
import { BoardType, TileReducerAction } from "../types/tileReducer";

import { changeBoardTile, generateNewBoard } from "../utils/tileReducer";

const boardReducer = (boardData: BoardType, action: TileReducerAction): BoardType => {
    switch (action.type) {
        case "add": {
            const { width, height } = action;
            const newBoard = generateNewBoard(width, height);
            return {
                ...DEFAULT_BOARD,
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
            const boardTiles = changeBoardTile(boardData.board, pos_x, pos_y, field, newValue);

            return { ...boardData, board: boardTiles };
        }

        case "delete": {
            return DEFAULT_BOARD;
        }
    }
};

export default boardReducer;
