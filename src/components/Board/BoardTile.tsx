import { StartEndKey } from "../../types/tileReducer";
import { TileKey, TileType, TileTypes } from "../../types/TileTypes";
import { useAppContext } from "../../useContextHook";
import { getClassName } from "../../utils/BoardTile";

interface Props {
    tile: TileType;
    isMouseDown: boolean;
}

const BoardTile = ({ tile, isMouseDown }: Props) => {
    const { pos, type } = tile;
    const { fieldType, boardData, boardDispatch, isRunning } = useAppContext();

    const updateStartEndField = (key: StartEndKey, new_x: number, new_y: number): void => {
        boardDispatch({
            type: "changeStartEnd",
            key: key,
            pos_x: new_x,
            pos_y: new_y,
        });
    };

    const updateTileValue = (field: TileKey, newValue: TileType[TileKey], pos_x: number, pos_y: number): void => {
        boardDispatch({
            type: "changeTile",
            pos_x: pos_x,
            pos_y: pos_y,
            field: field,
            newValue: newValue,
        });
    };

    const clearTileType = (tileType: TileTypes, pos_x: number, pos_y: number): void => {
        if (tileType === "start" || tileType === "end") {
            updateStartEndField(tileType as StartEndKey, -1, -1);
        }
        updateTileValue("type", "", pos_x, pos_y);
    };

    const handleTileClick = (): void => {
        if (isRunning) {
            return;
        }
        if (fieldType === "start" || fieldType === "end") {
            const prevTile = fieldType === "start" ? boardData.start : boardData.end;
            clearTileType(fieldType, prevTile.pos_x, prevTile.pos_y);
        }

        if (type === "start" || type === "end") {
            updateStartEndField(type as StartEndKey, -1, -1);
        }

        updateTileValue("type", fieldType, pos.pos_x, pos.pos_y);

        if (fieldType === "start" || fieldType === "end") {
            updateStartEndField(fieldType, pos.pos_x, pos.pos_y);
        }
    };

    const handleMouseEnter = (): void => {
        if (isMouseDown && fieldType === "obstacle") {
            handleTileClick();
        }
    };

    return (
        <button
            onMouseEnter={handleMouseEnter}
            onClick={handleTileClick}
            className={`flex-1 ${getClassName(type)} border-black border-[1px]`}
        ></button>
    );
};

export default BoardTile;
