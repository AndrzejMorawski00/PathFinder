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
        <div className="flex flex-row justify-around  py-[1rem] bg-blue-400">
            <AlgorithmSelector />
            <button className="navbarButton" onClick={handleAlgorithmStart}>
                Start Algorithm
            </button>
        </div>
    );
};

export default Header;
