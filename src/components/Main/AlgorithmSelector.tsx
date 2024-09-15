import { Fragment, useEffect, useState } from "react";
import { useAppContext } from "../../useContextHook";
import { AlgorithmHeuristics } from "../../constants/Heuristics";
import { ALGORITHM_TYPES } from "../../constants/AlgorithmTypes";
import { AlgorithmTypes, ExtendedAlgorithmTypes } from "../../types/AlgorithmTypes";

const AlgorithmSelector = () => {
    const { handleAlgorithmChange, handleHeuristicChange, algorithmName, heuristicName } = useAppContext();

    const [oldAlgorithm, setOldAlgorithm] = useState("");

    useEffect(() => {
        if (algorithmName.length > 0 || heuristicName.length > 0) {
            handleOldAlgorithmChange();
        }
    }, [algorithmName]);

    const handleOldAlgorithmChange = (): void => {
        const algorithm = AlgorithmHeuristics.get(algorithmName);
        if (algorithm === undefined) {
            setOldAlgorithm("");
        } else if (algorithm.default === heuristicName) {
            setOldAlgorithm(algorithmName);
        } else {
            setOldAlgorithm(`${algorithmName} - ${heuristicName}`);
        }
    };

    const handleFormDataChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.target.value;
        let [algorithm, heuristic] = value.split("-");
        if (!ALGORITHM_TYPES.includes(algorithm as AlgorithmTypes)) {
            algorithm = "" as ExtendedAlgorithmTypes;
        }
        if (heuristic === undefined || heuristic === "") {
            heuristic = AlgorithmHeuristics.get(algorithm)!.default;
        }
        handleHeuristicChange(heuristic);
        handleAlgorithmChange(algorithm as ExtendedAlgorithmTypes);
    };

    return (
        <form>
            <label htmlFor="algorithm">Select an algorithm:</label>
            <select name="algorithm" id="algorithm" onChange={handleFormDataChange}>
                <Fragment>
                    <option value={oldAlgorithm}>{oldAlgorithm}</option>
                </Fragment>
                {ALGORITHM_TYPES.map((algorithm) => (
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
