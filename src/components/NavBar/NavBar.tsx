import { useAppContext } from "../../useContextHook";
import Form from "./Form";

import { FIELD_TYPE_LIST } from "../../constants";

import { generateGraph, usePathFindingAlgorithm } from "../../providers/useGraphAlgorithm";

type FieldType = (typeof FIELD_TYPE_LIST)[number];
const NavBar = () => {
    const { boardData, boardDispatch } = useAppContext();
    const algorithm = usePathFindingAlgorithm();
    const resetBoardList = [3, 4];
    const clearBoardList = [2, 3, 4];

    const checkInputData = () => {
        return true;
    };

    const handleAlgorithmStart = () => {
        if (checkInputData()) {
            console.clear();
            const graph = generateGraph(boardData.board);
            algorithm(graph, boardData.start, boardData.end);
        } else {
            alert("Invalid InputData");
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
