import Board from "../Board/Board";
import Header from "./Header";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen w-[100%] min-w-[70%]">
            <Header />
            <Board />
        </div>
    );
};

export default Main;
