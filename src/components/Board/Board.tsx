import { useState } from "react";
import { useAppContext } from "../../useContextHook";
import BoardTile from "./BoardTile";

const Board = () => {
    const { boardData } = useAppContext();
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    const handleIsMouseDownChange = (newValue: boolean) => {
        setIsMouseDown(newValue);
    };

    return (
        <div
            className="flex flex-col items-center justify-center flex-1 w-full h-full"
            onMouseDown={() => handleIsMouseDownChange(true)}
            onMouseUp={() => handleIsMouseDownChange(false)}
        >
            {boardData.board.length ? (
                boardData.board.map((row, idx) => (
                    <div key={idx} className="flex flex-row flex-1 w-full">
                        {row.map((tile, idx) => (
                            <BoardTile isMouseDown={isMouseDown} key={idx} tile={tile} />
                        ))}
                    </div>
                ))
            ) : (
                <h2 className="">You have to generate board first</h2>
            )}
        </div>
    );
};

export default Board;
