import { CLEAR_FIELD_TYPES, RESET_FIELD_TYPES } from "../../constants/FieldTypes";
import { FieldType } from "../../types/FieldTypes";
import { useAppContext } from "../../useContextHook";

interface Props {}

const BoardActions = ({}: Props) => {
    const { boardData, boardDispatch } = useAppContext();

    const handleBoardResetByTileType = (tiles: FieldType[]): void => {
        boardData.board.forEach((row) => {
            row.forEach((tile) => {
                if (!tiles.find((elem) => elem === tile.type)) {
                    return;
                }
                boardDispatch({
                    type: "changeTile",
                    pos_x: tile.pos.pos_x,
                    pos_y: tile.pos.pos_y,
                    field: "type",
                    newValue: "",
                });
            });
        });
    };

    return (
        <div className="flex flex-col pt-3 gap-3">
            <button
                className="border-2 border-fontColor px-3 capitalize font-bold text-l xl:text-xl 2xl:text-3xl rounded transition duration-150 hover:bg-fontHover/50 "
                title="Remove Visited Fields"
                onClick={() => handleBoardResetByTileType(RESET_FIELD_TYPES)}
            >
                Reset Board
            </button>
            <button
                className="border-2 border-fontColor px-3 capitalize font-bold text-l xl:text-xl 2xl:text-3xl rounded transition duration-150 hover:bg-fontHover/50 "
                title="Remove Visited Fields and Obstacles"
                onClick={() => handleBoardResetByTileType(CLEAR_FIELD_TYPES)}
            >
                Clear Board
            </button>
        </div>
    );
};
export default BoardActions;
