import { useAppContext } from "../../useContextHook";
import Form from "./Form";

import {
    // generateGraph,
    // useDijkstraAlgorithm,
    // useAStarAlgorithm,
    // useGreedyBFSAlgorithm,
} from "../../providers/useGraphAlgorithm";

import {
    generateGraph,
    useDijkstraAlgorithm,
    useGreedyBFSAlgorithm,
    useAStarAlgorithm,
} from "../../providers/newGraph";

const NavBar = () => {
    const { boardData } = useAppContext();
    const dijkstraAlgorithm = useAStarAlgorithm();

    const handleStartClickv2 = () => {
        console.clear();
        const graph = generateGraph(boardData.board);
        dijkstraAlgorithm(graph, boardData.start, boardData.end);
    };

    // const aStarAlgorithm = useAStarAlgorithm();
    // const handleStartClickv1 = () => {
    //     console.clear();
    //     const graph = generateGraph(boardData.board);
    //     aStarAlgorithm(graph, boardData.start, boardData.end);
    // };

    // const greedyBFS = useGreedyBFSAlgorithm;
    // const handleStartClickv3 = () => {
    //     console.clear();
    //     const graph = generateGraph(boardData.board);
    //     greedyBFS(graph, boardData.start, boardData.end);
    // };

    return (
        <div>
            <div>
                {/* <button onClick={handleStartClickv1}>Start A*</button> */}
                <button onClick={handleStartClickv2}>Start Dijkstra</button>
                {/* <button onClick={handleStartClickv3}>Start BFS</button> */}
                <button>Clear Board</button>
            </div>
            <Form />
        </div>
    );
};

export default NavBar;
