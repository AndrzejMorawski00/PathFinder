import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { HEADER_FIELD_TYPES } from "../../constants/FieldTypes";
import { useAppContext } from "../../useContextHook";

interface Props {}

const TileSelector = ({}: Props) => {
    const { fieldType, handleFieldTypeChange } = useAppContext();
    return (
        <div>
            <h2>Create:</h2>
            <ToggleGroup.Root type="single" className="flex flex-row gap-3">
                {HEADER_FIELD_TYPES.map((field) => (
                    <ToggleGroup.Item
                        key={field}
                        className={`border px-3 py-1 ${fieldType === field ? "bg-red-800" : ""}`}
                        value={field}
                        onClick={() => handleFieldTypeChange(field)}
                    >
                        {field === 'obstacle' ? 'Obstacles' : `${field} Point`}
                    </ToggleGroup.Item>
                ))}
            </ToggleGroup.Root>
        </div>
    );
};

export default TileSelector;
