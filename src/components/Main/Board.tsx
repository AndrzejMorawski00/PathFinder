import { StartEndKey, TileKey, TileType, TileTypes } from "../../types";
import { useAppContext, useMainContext } from "../../useContextHook";

const Board = () => {
    const { boardData } = useAppContext();
    return (
        <div>
            {boardData.board.map((row, idx) => (
                <div key={idx}>
                    {row.map((tile, idx) => (
                        <BoardTile key={idx} tile={tile} />
                    ))}
                </div>
            ))}
        </div>
    );
};

interface IBoardTile {
    tile: TileType;
}

const BoardTile = ({ tile }: IBoardTile) => {
    const { pos, type } = tile; // CurrentTileData (position and type)
    const { boardData, boardDispatch } = useAppContext(); // Board Data And BoardDispatch
    const { fieldType } = useMainContext(); // selected FieldType from header to replace old value

    const updateStartEndField = (key: StartEndKey, new_x: number, new_y: number) => {
        boardDispatch({
            type: "changeStartEnd",
            key: key,
            pos_x: new_x,
            pos_y: new_y,
        });
    };

    const updateTileValue = (field: TileKey, newValue: TileType[TileKey], pos_x: number, pos_y: number) => {
        boardDispatch({
            type: "changeTile",
            pos_x: pos_x,
            pos_y: pos_y,
            field: field,
            newValue: newValue,
        });
    };

    const clearTileType = (tileType: TileTypes, pos_x: number, pos_y: number) => {
        if (tileType === "start" || tileType === "end") {
            updateStartEndField(tileType as StartEndKey, -1, -1);
        }
        updateTileValue("type", "", pos_x, pos_y);
    };

    const handleTileClick = () => {
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

    const getClassName = (): string => {
        switch (type) {
            case "start":
                return "start";
            case "end":
                return "end";
            case "obstacle":
                return "obstacle";
            case "visited":
                return "visited";
            case "path":
                return "path";
            default:
                return "";
        }
    };

    return (
        <button onClick={handleTileClick} className={getClassName()}>
            x
        </button>
    );
};

export default Board;
