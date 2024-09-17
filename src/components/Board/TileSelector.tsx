import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { HEADER_FIELD_TYPES } from "../../constants/FieldTypes";
import { useAppContext } from "../../useContextHook";
import classNames from "classnames";

const TileSelector = () => {
    const { fieldType, handleFieldTypeChange } = useAppContext();
    return (
        <div className="flex flex-col items-center px-3">
            <h2 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-2 text-center">Create:</h2>
            <ToggleGroup.Root type="single" className="flex flex-col gap-3">
                {HEADER_FIELD_TYPES.map((field) => (
                    <ToggleGroup.Item
                        key={field}
                        className={classNames(
                            "border-2 border-fontColor px-3 capitalize font-bold text-l xl:text-xl 2xl:text-3xl rounded transition duration-150 hover:bg-fontHover/50",
                            fieldType === field ? "bg-fontHover hover:bg-fontHover" : "hover:bg-fontHover/50"
                        )}
                        value={field}
                        onClick={() => handleFieldTypeChange(field)}
                    >
                        {field === "obstacle" ? "Obstacles" : `${field} Point`}
                    </ToggleGroup.Item>
                ))}
            </ToggleGroup.Root>
        </div>
    );
};

export default TileSelector;
