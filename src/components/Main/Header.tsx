import { ALGORITHM_LIST, FIELD_TYPE } from "../../constants";
import { useMainContext } from "../../useContextHook";

const Header = () => {
    const { fieldType, handleFieldTypeChange } = useMainContext();
    return (
        <div className="header">
            <form>
                <label htmlFor="algorithm">Select an algorithm:</label>
                <select name="algorithm" id="algorithm">
                    {ALGORITHM_LIST.map((alg, idx) => (
                        <option key={idx} value={alg}>
                            {alg}
                        </option>
                    ))}
                </select>
            </form>
            <div className="header-field">
                {FIELD_TYPE.map((field, idx) => (
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
