import Board from "../Board/Board";
import Header from "./Header";

const Main = () => {
    return (
        <div className="flex flex-col items-center flex-grow w-full h-screen">
            <Header />
            <Board />
        </div>
    );
};

export default Main;
