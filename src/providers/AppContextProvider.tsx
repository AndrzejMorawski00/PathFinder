import { createContext, ReactNode, useReducer, useState } from "react";
import { AppContextType } from "../types/ContextTypes";
import boardReducer from "./TileReducer";
import { DEFAULT_BOARD } from "../constants/BoardData";
import { ExtendedAlgorithmTypes } from "../types/AlgorithmTypes";

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

const AppContextProvider = ({ children }: Props) => {
    const [boardData, boardDispatch] = useReducer(boardReducer, DEFAULT_BOARD);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [algorithm, setAlgorithm] = useState<ExtendedAlgorithmTypes>("");
    const [heuristic, setHeuristic] = useState<string>("");

    const handleAlgorithmChange = (newAlgorithm: ExtendedAlgorithmTypes): void => {
        setAlgorithm(newAlgorithm);
    };

    const handleHeuristicChange = (newAlgorithm: string): void => {
        setHeuristic(newAlgorithm);
    };

    const handleIsRunningChange = (newValue: boolean) => {
        setIsRunning(newValue);
    };

    const appContext: AppContextType = {
        isRunning: isRunning,
        handleIsRunningChange: handleIsRunningChange,
        boardData: boardData,
        boardDispatch: boardDispatch,
        algorithmName: algorithm,
        handleAlgorithmChange: handleAlgorithmChange,
        heuristicName: heuristic,
        handleHeuristicChange: handleHeuristicChange,
    };

    return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
