import MainContextProvider from "../../providers/MainContextProvider";
import Board from "../Board/Board";
import Header from "./Header";

const Main = () => {
    return (
        <MainContextProvider>
            <div className="flex flex-col min-h-screen w-[100%] min-w-[70%]">
                <Header />
                <Board />
            </div>
        </MainContextProvider>
    );
};

export default Main;
