import { TileTypes } from "../../types";
import Board from "./Board";
import Header from "./Header";

import { createContext, useState } from "react";

export interface IMainContext {
    fieldType: TileTypes;
    handleFieldTypeChange: (newType: TileTypes) => void;
}

export const MainContext = createContext<IMainContext | undefined>(undefined);

const Main = () => {
    const [fieldType, setFieldType] = useState<TileTypes>("");

    const handleFieldTypeChange = (newType: TileTypes) => {
        if (newType === fieldType) {
            setFieldType("");
        } else {
            setFieldType(newType);
        }
    };

    const mainContext = {
        fieldType: fieldType,
        handleFieldTypeChange: handleFieldTypeChange,
    };

    return (
        <MainContext.Provider value={mainContext}>
            <div className="flex flex-col min-h-screen w-[100%] min-w-[70%]">
                <Header />
                <Board />
            </div>
        </MainContext.Provider>
    );
};

export default Main;
