import { Dispatch } from "react";
import { BoardType, TileReducerAction } from "./tileReducer";
import { ExtendedAlgorithmTypes } from "./AlgorithmTypes";
import { TileTypes } from "./TileTypes";

export type AppContextType = {
    fieldType: TileTypes;
    handleFieldTypeChange: (newType: TileTypes) => void;
    isRunning: boolean;
    handleIsRunningChange: (newValue: boolean) => void;
    boardData: BoardType;
    boardDispatch: Dispatch<TileReducerAction>;
    algorithmName: ExtendedAlgorithmTypes;
    handleAlgorithmChange: (newAlgorithm: ExtendedAlgorithmTypes) => void;
    heuristicName: string;
    handleHeuristicChange: (newAlgorithm: string) => void;
};
