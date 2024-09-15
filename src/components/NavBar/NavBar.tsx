import { useAppContext } from "../../useContextHook";

import { generateGraph, usePathFindingAlgorithm } from "../../providers/useGraphAlgorithm";
import { FieldType } from "../../types/FieldTypes";
import { CLEAR_FIELD_TYPES, RESET_FIELD_TYPES } from "../../constants/FieldTypes";
import { checkInputData } from "../../utils/NavBar";
import Form from "./Form";

const NavBar = () => {
    const { boardData, boardDispatch, algorithmName } = useAppContext();
    const algorithm = usePathFindingAlgorithm();

    const handleAlgorithmStart = () => {
        if (checkInputData(boardData, algorithmName)) {
            const graph = generateGraph(boardData.board);
            algorithm(graph, boardData.start, boardData.end);
            return;
        }
    };

    const handleBoardResetByTileType = (tiles: FieldType[]) => {
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
        <div className="bg-gray-200 min-h-screen flex flex-col px-[1.5rem] pt-[1rem]">
            <div className="flex flex-col pt-[2rem] pb-[5rem] gap-3">
                <button className="navbarButton" onClick={handleAlgorithmStart}>
                    Start Algorithm
                </button>
                <button className="navbarButton" onClick={() => handleBoardResetByTileType(RESET_FIELD_TYPES)}>
                    Reset Board
                </button>
                <button className="navbarButton" onClick={() => handleBoardResetByTileType(CLEAR_FIELD_TYPES)}>
                    Clear Board
                </button>
            </div>
            <Form />
        </div>
    );
};

export default NavBar;
