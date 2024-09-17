import { useAppContext } from "../../useContextHook";

import AlgorithmSelector from "./AlgorithmSelector";

import { usePathFindingAlgorithm } from "../../providers/useGraphAlgorithm";
import { checkInputData } from "../../utils/NavBar";
import { generateGraph } from "../../utils/graphAlgorithm";

const Header = () => {
    const { boardData, algorithmName, isRunning, handleIsRunningChange } = useAppContext();
    const algorithm = usePathFindingAlgorithm();
    const handleAlgorithmStart = async (): Promise<void> => {
        handleIsRunningChange(true);
        if (!checkInputData(boardData, algorithmName) || isRunning) {
            handleIsRunningChange(false);
            return;
        }
        const graph = generateGraph(boardData.board);
        await algorithm(graph, boardData.start, boardData.end);
        handleIsRunningChange(false);
    };

    return (
        <div className="flex flex-row w-full items-center justify-around py-5 px-3 bg-backgroundColor">
            <AlgorithmSelector />
            <button
                className="border-2  py-1 px-2 border-fontColor font-bold text-xl xl:text-2xl 2xl:text-3xl text-nowrap rounded transition duration-300 hover:bg-fontColor/20"
                onClick={handleAlgorithmStart}
            >
                Start Algorithm
            </button>
        </div>
    );
};

export default Header;
