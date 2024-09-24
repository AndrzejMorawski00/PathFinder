import { useState } from "react";
import { useAppContext } from "../../useContextHook";
import { MAX_BOARD_HEIGHT, MAX_BOARD_WIDTH, MIN_BOARD_HEIGHT, MIN_BOARD_WIDTH } from "../../constants/BoardData";
import { isValidKeyValue, printMessages, validateBoardSide } from "../../utils/utils";

const INITIAL_FORM_DATA = {
    width: "",
    height: "",
};

type FormDataType = {
    width: string;
    height: string;
};

const Form = () => {
    const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
    const { boardDispatch } = useAppContext();

    const handleFormDataChange = <T extends keyof FormDataType>(key: string, val: FormDataType[T]): void => {
        if (isValidKeyValue(key, formData)) {
            setFormData({ ...formData, [key]: val });
            return;
        }
        throw new Error(`Invalid key ${key}`);
    };

    const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const { width, height } = formData;
        const messages: string[] = [];
        if (!validateBoardSide(+width, MIN_BOARD_WIDTH, MAX_BOARD_WIDTH)) {
            messages.push(`Board width must be in [${MIN_BOARD_WIDTH},${MAX_BOARD_WIDTH}] range`);
        }
        if (!validateBoardSide(+height, MIN_BOARD_HEIGHT, MAX_BOARD_HEIGHT)) {
            messages.push(`Board height must be in [${MIN_BOARD_HEIGHT},${MAX_BOARD_HEIGHT}] range`);
        }
        if (messages.length) {
            printMessages(messages);
        } else {
            boardDispatch({
                type: "add",
                width: +width,
                height: +height,
            });
        }
    };

    return (
        <form className="flex flex-col gap-1 xl:gap-4 2xl:gap-6 w-fit">
            <h2 className="text-2xl xl:text-3xl 2xl:text-5xl font-bold text-center">Size of the Board</h2>
            <div className="flex flex-row px-3 items-center justify-between">
                <label className="text-l xl:text-xl 2xl:text-3xl tracking-tight" htmlFor="width">
                    Width:
                </label>
                <input
                    className="bg-boardBackground text-l  xl:text-xl 2xl:text-3xl px-2 tacking-wide w-[40%] outline-none font-semibold border-b-2 border-b-fontHover transition duration-300 hover:bg-boardBackground/85 active:hover:bg-boardBackground/85 focus:hover:bg-boardBackground/85"
                    type="number"
                    name="width"
                    id="width"
                    min={5}
                    max={100}
                    value={formData.width}
                    onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                />
            </div>

            <div className="flex flex-row gap-3 p-3 items-center justify-between">
                <label className="text-l  xl:text-xl 2xl:text-3xl tracking-tight" htmlFor="height">
                    Height:
                </label>
                <input
                    className="bg-boardBackground text-l  xl:text-xl 2xl:text-3xl px-2 tacking-wide w-[40%] outline-none font-semibold border-b-2 border-b-fontHover transition duration-300 hover:bg-boardBackground/85 active:hover:bg-boardBackground/85 focus:hover:bg-boardBackground/85"
                    type="number"
                    name="height"
                    id="height"
                    min={5}
                    max={100}
                    value={formData.height}
                    onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                />
            </div>
            <button
                className="border-2 mx-5 p-1 border-fontColor font-bold text-l  xl:text-xl 2xl:text-3xl text-nowrap rounded transition duration-300 hover:bg-fontColor/20"
                onClick={handleFormSubmit}
                type="submit"
            >
                Generate Board
            </button>
        </form>
    );
};

export default Form;
