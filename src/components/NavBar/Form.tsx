import { useState } from "react";
import { useAppContext } from "../../useContextHook";

import { MIN_BOARD_WIDTH, MAX_BOARD_WIDTH, MIN_BOARD_HEIGHT, MAX_BOARD_HEIGHT } from "../../constants";
import { printMessages } from "../../misc";

const INITIAL_FORM_DATA = {
    width: "",
    height: "",
};

type FormDataType = {
    width: string;
    height: string;
};

const validateBoardSide = (size: number, minVal: number, maxVal: number) => {
    return size >= minVal && size <= maxVal;
};

const Form = () => {
    const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
    const { boardDispatch } = useAppContext();

    const handleFormDataChange = <T extends keyof FormDataType>(key: T, val: FormDataType[T]) => {
        setFormData({ ...formData, [key]: val });
    };

    const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        <form>
            <div>
                <label htmlFor="">Width:</label>
                <input
                    type="number"
                    name="width"
                    id="width"
                    min={5}
                    max={100}
                    value={formData.width}
                    onChange={(e) => handleFormDataChange("width", e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="">height:</label>
                <input
                    type="number"
                    name="height"
                    id="height"
                    min={5}
                    max={100}
                    value={formData.height}
                    onChange={(e) => handleFormDataChange("height", e.target.value)}
                />
            </div>
            <button onClick={handleFormSubmit} type="submit">
                Generate Board
            </button>
        </form>
    );
};

export default Form;
