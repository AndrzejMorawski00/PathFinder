import { useReducer, createContext, Dispatch, useState } from "react";

import boardReducer from "./providers/TileReducer";

import { DEFAULT_BOARD } from "./constants";
import { BoardType, ExtendedAlgorithmTypes, TileReducerAction } from "./types";

import NavBar from "./components/NavBar/NavBar.tsx";
import Main from "./components/Main/Main.tsx";

import "./main.css";

export interface IAppContext {
    boardData: BoardType;
    boardDispatch: Dispatch<TileReducerAction>;
    algorithmName: ExtendedAlgorithmTypes;
    handleAlgorithmChange: (newAlgorithm: ExtendedAlgorithmTypes) => void;
    heuristicName: string;
    handleHeuristicChange: (newAlgorithm: string) => void;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

function App() {
    const [boardData, boardDispatch] = useReducer(boardReducer, DEFAULT_BOARD);
    const [algorithm, setAlgorithm] = useState<ExtendedAlgorithmTypes>("");
    const [heuristic, setHeuristic] = useState("");

    const handleAlgorithmChange = (newAlgorithm: ExtendedAlgorithmTypes) => {
        setAlgorithm(newAlgorithm);
    };

    const handleHeuristicChange = (newAlgorithm: string) => {
        setHeuristic(newAlgorithm);
    };

    const appContext = {
        boardData: boardData,
        boardDispatch: boardDispatch,
        algorithmName: algorithm,
        handleAlgorithmChange: handleAlgorithmChange,
        heuristicName: heuristic,
        handleHeuristicChange: handleHeuristicChange,
    };

    return (
        <AppContext.Provider value={appContext}>
            <div className="main">
                <NavBar />
                <Main />
            </div>
        </AppContext.Provider>
    );
}

export default App;

