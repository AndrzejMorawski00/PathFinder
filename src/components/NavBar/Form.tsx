import { useState } from "react";
import { useAppContext } from "../../useContextHook";

const INITIAL_FORM_DATA = {
    width: "",
    height: "",
};

type FormDataType = {
    width: string;
    height: string;
};

const validateBoardSize = (width: number, height: number) => {
    return +width > 1 && +width < 100 && +height > 1 && +height < 100;
};

const Form = () => {
    const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
    const { boardDispatch } = useAppContext();

    const handleFormDataChange = <T extends keyof FormDataType>(key: T, val: FormDataType[T]) => {
        setFormData({ ...formData, [key]: val });
    };

    const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { width, height } = formData;
        e.preventDefault();
        if (validateBoardSize(+width, +height)) {
            boardDispatch({ type: "add", width: +width, height: +height });
            setFormData(INITIAL_FORM_DATA);
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
