import { useMainContext } from "../../useContextHook";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import AlgorithmSelector from "./AlgorithmSelector";
import { HEADER_FIELD_TYPES } from "../../constants/FieldTypes";

const Header = () => {
    const { fieldType, handleFieldTypeChange } = useMainContext();

    return (
        <div className="flex flex-row justify-around  py-[1rem] bg-blue-400">
            <AlgorithmSelector />
            <ToggleGroup.Root type="single" className="flex flex-row gap-3">
                {HEADER_FIELD_TYPES.map((field) => (
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
