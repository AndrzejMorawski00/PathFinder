import { ALGORITHM_TYPES } from "../constants/AlgorithmTypes";

export type AlgorithmTypes = (typeof ALGORITHM_TYPES)[number];
export type ExtendedAlgorithmTypes = AlgorithmTypes | "";

export type PriorityQueueItem = [number, string];
