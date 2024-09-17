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
        <form className="flex flex-col xl:flex-row items-left justify-center gap-1">
            <label htmlFor="algorithm" className="text-xl xl:text-2xl 2xl:text-3x tracking-wider font-semibold">
                Select an algorithm:
            </label>
            <select
                className="border-b-2 border-fontHover bg-boardBackground text-xl xl:text-2xl 2xl:text-3x rounded-none px-1 py-1 outline-none transition duration-300 hover:"
                name="algorithm"
                id="algorithm"
                onChange={handleFormDataChange}
            >
                <Fragment>
                    <option className="" value={oldAlgorithm}>
                        {oldAlgorithm}
                    </option>
                </Fragment>
                {ALGORITHM_TYPES.map((algorithm) => (
                    <Fragment key={algorithm}>
                        <option className="" value={algorithm}>
                            {algorithm}
                        </option>
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
