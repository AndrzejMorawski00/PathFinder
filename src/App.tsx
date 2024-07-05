import { useReducer, createContext, Dispatch, useState } from "react";

import boardReducer from "./providers/TileReducer";

import { DEFAULT_BOARD } from "./constants";
import { BoardType, TileReducerAction } from "./types";

import NavBar from "./components/NavBar/NavBar.tsx";
import Main from "./components/Main/Main.tsx";

import "./main.css";

export interface IAppContext {
    boardData: BoardType;
    boardDispatch: Dispatch<TileReducerAction>;
    algorithm: string;
    handleAlgorithmChange: (newAlgorithm: string) => void;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

function App() {
    const [boardData, boardDispatch] = useReducer(boardReducer, DEFAULT_BOARD);
    const [algorithm, setAlgorithm] = useState("");

    const handleAlgorithmChange = (newAlgorithm: string) => {
        setAlgorithm(newAlgorithm);
    };

    const appContext = {
        boardData: boardData,
        boardDispatch: boardDispatch,
        algorithm: algorithm,
        handleAlgorithmChange: handleAlgorithmChange,
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
