import { FIELD_TYPE_LIST } from "../../constants";
import { useMainContext } from "../../useContextHook";

import AlgorithmSelector from "./AlgorithmSelector";

const Header = () => {
    const { fieldType, handleFieldTypeChange } = useMainContext();
    const avaliavbleFieldTypes = [0, 1, 2];
    return (
        <div className="header">
            <AlgorithmSelector />
            <div className="header-field">
                {Array.from(avaliavbleFieldTypes, (idx) => FIELD_TYPE_LIST[idx]).map((field, idx) => (
                    <button
                        className={fieldType === field ? "selected-field" : ""}
                        key={idx}
                        onClick={() => handleFieldTypeChange(field)}
                    >
                        {field}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Header;
