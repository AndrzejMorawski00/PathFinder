import Form from "./Form";
import TileSelector from "../Board/TileSelector";
import BoardActions from "./BoardActions";

const NavBar = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex flex-col px-[1.5rem] pt-[1rem]">
            <Form />
            <TileSelector />
            <BoardActions />
        </div>
    );
};

export default NavBar;
