import { FIELD_TYPE_LIST } from "../../constants";
import { useMainContext } from "../../useContextHook";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import AlgorithmSelector from "./AlgorithmSelector";

const Header = () => {
    const { fieldType, handleFieldTypeChange } = useMainContext();
    const avaliavbleFieldTypes = [0, 1, 2];
    const selectedFields = Array.from(avaliavbleFieldTypes, (idx) => FIELD_TYPE_LIST[idx]);
    return (
        <div className="flex flex-row justify-around  py-[1rem] bg-blue-400">
            <AlgorithmSelector />
            <ToggleGroup.Root type="single" className="flex flex-row gap-3">
                {selectedFields.map((field) => (
                    <ToggleGroup.Item
                        key={field}
                        className={`border px-3 py-1 ${fieldType === field ? "bg-red-800" : ""}`}
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
