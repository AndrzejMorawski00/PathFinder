import { PriorityQueue } from "../utils/DataStructures/PriorityQueue";
import { useAppContext } from "../useContextHook";

import { TileKey, TilePos, TileType } from "../types/TileTypes";
import { GraphType, PathFindingFunction } from "../types/Graph";
import { createHeuristicFactory } from "../utils/utils";
import { delay, findPath, findShortestPath, getDelay, isValidField, TileComparator } from "../utils/graphAlgorithm";

import { PriorityQueueItem } from "../types/AlgorithmTypes";
import { AnimationSpeed } from "../constants/GraphAlgorithm";

export const usePathFindingAlgorithm = (): PathFindingFunction => {
    const { boardDispatch, boardData, algorithmName, heuristicName } = useAppContext();
    const heuristicFactory = createHeuristicFactory();

    const handleTileColorChange = async (
        delayValue: AnimationSpeed,
        tile: TilePos,
        field: TileKey,
        newValue: TileType[TileKey]
    ): Promise<void> => {
        const { pos_x, pos_y } = tile;
        if (!(isValidField(pos_x, pos_y, boardData.start) && isValidField(pos_x, pos_y, boardData.end))) {
            return;
        }
        boardDispatch({
            type: "changeTile",
            pos_x: pos_x,
            pos_y: pos_y,
            field: field,
            newValue: newValue,
        });
        await delay(delayValue);
    };

    const handleColoringPath = async (delayValue: AnimationSpeed, path: string[], exists: boolean): Promise<void> => {
        if (!exists) {
            return;
        }
        for (let i = 0; i < path.length; i++) {
            const JSONItem = JSON.parse(path[i]);
            await handleTileColorChange(delayValue, JSONItem, "type", "path");
        }
    };

    const pathFindingAlgorithm = async (graph: GraphType, start: TilePos, end: TilePos): Promise<void> => {
        const delayValue = getDelay(boardData.board.length, boardData.board[0].length);
        let graphKeys = Array.from(graph.keys());
        const distances = new Map<string, number>();
        const visited = new Set<string>();
        const prev = new Map<string, string>();
        const pq = new PriorityQueue<PriorityQueueItem>([], TileComparator);
        const heuresticConst = algorithmName === "A*" ? 1 : 0;
        const heuristic = heuristicFactory.getHeuristic(heuristicName);
        for (const key of graphKeys) {
            distances.set(key, Infinity);
            prev.set(key, "");
        }

        distances.set(JSON.stringify(start), 0);
        pq.insertValue([0, JSON.stringify(start)]);
        while (!pq.isEmpty()) {
            const [_, item] = pq.getHead();
            if (visited.has(item)) {
                continue;
            }

            visited.add(item);
            const JSONItem: TilePos = JSON.parse(item);
            await handleTileColorChange(delayValue, JSONItem, "type", "visited");

            const neighbors = graph.get(item) || [];
            for (const neighbor of neighbors) {
                const JSONNeighbor = JSON.stringify(neighbor);
                if (visited.has(JSONNeighbor)) {
                    continue;
                }

                let currDistance = distances.get(item);
                if (currDistance === undefined) {
                    currDistance = Infinity;
                }
                let newDistance = currDistance + 1;
                const heuresticValue = heuresticConst * heuristic(neighbor, end);
                if (newDistance < (distances.get(JSONNeighbor) || Infinity)) {
                    distances.set(JSONNeighbor, newDistance);
                    prev.set(JSONNeighbor, item);
                    pq.insertValue([newDistance + heuresticValue, JSONNeighbor]);
                }
            }
            if (item === JSON.stringify(end)) {
                break;
            }
        }

        const [path, exists] = findShortestPath(boardData.end, prev, distances);
        await handleColoringPath(delayValue, path, exists);
        exists ? alert("Finish") : alert(`Path doesn't exists`);
    };

    const greedyBFSAlgorith = async (graph: GraphType, start: TilePos, end: TilePos): Promise<void> => {
        const delayValue = getDelay(boardData.board.length, boardData.board[0].length);
        const visited = new Set<string>();
        const prev = new Map<string, string>();
        const pq = new PriorityQueue<[number, string]>([], TileComparator);
        const heuristic = heuristicFactory.getHeuristic(heuristicName);
        pq.insertValue([heuristic(start, end), JSON.stringify(start)]);

        while (!pq.isEmpty()) {
            const [_, item] = pq.getHead();
            if (visited.has(item)) {
                continue;
            }
            visited.add(item);
            const JSONItem: TilePos = JSON.parse(item);
            await handleTileColorChange(delayValue, JSONItem, "type", "visited");

            const neighbors = graph.get(item) || [];
            for (const neighbor of neighbors) {
                const JSONNeighbor = JSON.stringify(neighbor);
                if (visited.has(JSONNeighbor)) {
                    continue;
                }
                prev.set(JSONNeighbor, item);
                const heuristicValue = heuristic(neighbor, end);
                pq.insertValue([heuristicValue, JSONNeighbor]);
            }
            if (item === JSON.stringify(end)) {
                break;
            }
        }
        const [path, exists] = findPath(boardData.end, prev);
        await handleColoringPath(delayValue, path, exists);
        exists ? alert("Finish") : alert(`Path doesn't exists`);
    };
    if (algorithmName === "Greedy BFS") {
        return greedyBFSAlgorith;
    }
    return pathFindingAlgorithm;
};
