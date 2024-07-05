import { Fragment, useState } from "react";
import { AlgorithmHeuristics, ALGORITHM_TYPE_LIST } from "../../constants";
import { useAppContext } from "../../useContextHook";

const AlgorithmSelector = () => {
    const { handleAlgorithmChange, handleHeuristicChange } = useAppContext();
    const [selected, setSelected] = useState(false);

    const handleFormDataChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(true);
        const value = event.target.value;
        let [algorithm, heuristic] = value.split("-");
        if (heuristic === undefined || heuristic === "") {
            heuristic = AlgorithmHeuristics.get(algorithm)!.default;
        }
        handleHeuristicChange(heuristic);
        handleAlgorithmChange(algorithm);
    };

    return (
        <form>
            <label htmlFor="algorithm">Select an algorithm:</label>
            <select name="algorithm" id="algorithm" onChange={handleFormDataChange}>
                {selected ? "" : <option></option>}
                {ALGORITHM_TYPE_LIST.map((algorithm) => (
                    <Fragment key={algorithm}>
                        <option value={algorithm}>{algorithm}</option>
                        {AlgorithmHeuristics.get(algorithm)?.list.map((heuristic) => (
                            <option key={heuristic} value={`${algorithm}-${heuristic}`}>
                                {algorithm} - {heuristic}
                            </option>
                        ))}
                    </Fragment>
                ))}
            </select>
        </form>
    );
};

export default AlgorithmSelector;
