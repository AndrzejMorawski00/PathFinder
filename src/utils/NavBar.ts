import { ExtendedAlgorithmTypes } from "../types/AlgorithmTypes";
import { BoardType } from "../types/tileReducer";
import { printMessages } from "./utils";

export const checkInputData = (boardData: BoardType, algorithmName: ExtendedAlgorithmTypes) => {
    const messages: string[] = [];
    if (!boardData.board.length) {
        messages.push("You need to generate a board.");
    }
    if (boardData.start.pos_x == -1 || boardData.start.pos_y == -1) {
        messages.push("You need to select starting point.");
    }
    if (boardData.end.pos_x == -1 || boardData.end.pos_y == -1) {
        messages.push("You need to select ending point.");
    }
    if (algorithmName === "") {
        messages.push("You need to select an algorithm.");
    }

    if (messages.length) {
        printMessages(messages);
        return false;
    }
    return true;
};
