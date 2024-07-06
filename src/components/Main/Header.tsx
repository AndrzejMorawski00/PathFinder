import { FIELD_TYPE_LIST } from "../../constants";
import { useMainContext } from "../../useContextHook";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import AlgorithmSelector from "./AlgorithmSelector";

const Header = () => {
    const { fieldType, handleFieldTypeChange } = useMainContext();
    const avaliavbleFieldTypes = [0, 1, 2];
    const selectedFields = Array.from(avaliavbleFieldTypes, (idx) => FIELD_TYPE_LIST[idx]);
    return (
        <div className="header">
            <AlgorithmSelector />
            <ToggleGroup.Root type="single" className="header-field">
                {selectedFields.map((field) => (
                    <ToggleGroup.Item
                        key={field}
                        className={fieldType === field ? "selected-field" : ""}
                        value={field}
                        onClick={() => handleFieldTypeChange(field)}
                    >
                        {field}
                    </ToggleGroup.Item>
                ))}
            </ToggleGroup.Root>
        </div>
    );
};

export default Header;
