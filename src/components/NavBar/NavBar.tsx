import Form from "./Form";
import TileSelector from "../Board/TileSelector";
import BoardActions from "./BoardActions";

const NavBar = () => {
    return (
        <div className="flex flex-col items-center xl:justify-center pt-2 bg-backgroundColor h-screen">
            <div className="flex flex-col gap-3 xl:gap-5 2xl:gap-8 items-center justify-between">
                <Form />
                <TileSelector />
                <BoardActions />
            </div>
        </div>
    );
};

export default NavBar;
