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
        <form className="flex flex-col gap-[2rem]">
            <h2>Size of the Board:</h2>
            <div className="flex flex-col gap-[0.2rem]">
                <label htmlFor="width">Width:</label>
                <input
                    className="px-2 py-1 tacking-wide"
                    type="number"
                    name="width"
                    id="width"
                    min={5}
                    max={100}
                    value={formData.width}
                    onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-[0.2rem]">
                <label htmlFor="height">Height:</label>
                <input
                    className="px-2 py-1 tacking-wide"
                    type="number"
                    name="height"
                    id="height"
                    min={5}
                    max={100}
                    value={formData.height}
                    onChange={(e) => handleFormDataChange(e.target.id, e.target.value)}
                />
            </div>
            <button className="bg-red-500" onClick={handleFormSubmit} type="submit">
                Generate Board
            </button>
        </form>
    );
};

export default Form;
