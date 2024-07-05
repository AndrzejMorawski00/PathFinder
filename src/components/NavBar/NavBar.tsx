import { useAppContext } from "../../useContextHook";
import Form from "./Form";

import { FIELD_TYPE_LIST } from "../../constants";
import { printMessages } from "../../misc";
import { generateGraph, usePathFindingAlgorithm } from "../../providers/useGraphAlgorithm";

type FieldType = (typeof FIELD_TYPE_LIST)[number];
const NavBar = () => {
    const { boardData, boardDispatch, algorithmName } = useAppContext();
    const algorithm = usePathFindingAlgorithm();
    const resetBoardList = [3, 4];
    const clearBoardList = [2, 3, 4];

    const checkInputData = () => {
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

    const handleAlgorithmStart = () => {
        if (checkInputData()) {
            console.clear();
            const graph = generateGraph(boardData.board);
            algorithm(graph, boardData.start, boardData.end);
            return;
        }
    };

    const handleBoardReset = (tiles: FieldType[]) => {
        boardData.board.forEach((row) => {
            row.forEach((tile) => {
                if (tiles.find((elem) => elem === tile.type) !== undefined) {
                    boardDispatch({
                        type: "changeTile",
                        pos_x: tile.pos.pos_x,
                        pos_y: tile.pos.pos_y,
                        field: "type",
                        newValue: "",
                    });
                }
            });
        });
    };

    return (
        <div>
            <div>
                <button onClick={handleAlgorithmStart}>Start Algorithm</button>
                <button onClick={() => handleBoardReset(Array.from(resetBoardList, (index) => FIELD_TYPE_LIST[index]))}>
                    Reset Board
                </button>
                <button onClick={() => handleBoardReset(Array.from(clearBoardList, (index) => FIELD_TYPE_LIST[index]))}>
                    Clear Board
                </button>
            </div>
            <Form />
        </div>
    );
};

export default NavBar;
