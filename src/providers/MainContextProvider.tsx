import { createContext, ReactNode, useState } from "react";
import { MainContextType } from "../types/ContextTypes";
import { TileTypes } from "../types/TileTypes";

export const MainContext = createContext<MainContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

const MainContextProvider = ({ children }: Props) => {
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

    return <MainContext.Provider value={mainContext}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
