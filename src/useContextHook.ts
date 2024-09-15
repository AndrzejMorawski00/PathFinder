import { useContext } from "react";
import { AppContext } from "./providers/AppContextProvider";
import { MainContext } from "./providers/MainContextProvider";

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("App Context is Undefined");
    }
    return context;
};

export const useMainContext = () => {
    const context = useContext(MainContext);
    if (context === undefined) {
        throw new Error("Main Context is Undefined");
    }
    return context;
};
