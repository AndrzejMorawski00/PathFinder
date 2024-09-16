import { useContext } from "react";
import { AppContext } from "./providers/AppContextProvider";

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("App Context is Undefined");
    }
    return context;
};
