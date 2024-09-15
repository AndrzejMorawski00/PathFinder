import { useAppContext } from "../../useContextHook";
import BoardTile from "./BoardTile";

const Board = () => {
    const { boardData } = useAppContext();
    return (
        <div className="flex flex-col flex-1 w-full h-full">
            {boardData.board.map((row, idx) => (
                <div key={idx} className="flex flex-row flex-1 w-full">
                    {row.map((tile, idx) => (
                        <BoardTile key={idx} tile={tile} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
