import { TilePos, TileType, GraphType, TileKey } from "../types";
import { PriorityQueue } from "../utils/DataStructures/PriorityQueue";
import { useAppContext } from "../useContextHook";
import { ALGORITHM_TYPE_LIST } from "../constants";
import { Comparator } from "../types/DataStructures";
import { createFactory } from "../utils/utils";

type T = [number, string];

const TileComparator: Comparator<T> = (a: T, b: T): boolean => {
    return a[0] < b[0];
};

const isValidMove = (field: number, minVal: number, maxVal: number) => {
    return minVal < field && field < maxVal;
};

const isValidField = (pos_x: number, pos_y: number, field: TilePos) => {
    return !(pos_x == field.pos_x && pos_y == field.pos_y);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateGraph = (board: TileType[][]): GraphType => {
    const moves = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
    ];

    const graphMap = new Map<string, TilePos[]>();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].type != "obstacle") {
                const currPos = board[i][j].pos;
                const JSONPos = JSON.stringify(currPos);
                if (!graphMap.has(JSONPos)) {
                    graphMap.set(JSONPos, []);
                }
                moves.forEach((move) => {
                    const neighbor: TilePos = {
                        pos_x: currPos.pos_x + move[1],
                        pos_y: currPos.pos_y + move[0],
                    };
                    if (
                        isValidMove(neighbor.pos_y, -1, board.length) &&
                        isValidMove(neighbor.pos_x, -1, board[i].length) &&
                        board[neighbor.pos_y][neighbor.pos_x].type !== "obstacle"
                    ) {
                        const currList = graphMap.get(JSONPos);
                        currList?.push(neighbor);
                        if (currList) {
                            graphMap.set(JSONPos, currList);
                        }
                    }
                });
            }
        }
    }
    return graphMap;
};

export const usePathFindingAlgorithm = () => {
    const { boardDispatch, boardData, algorithmName, heuristicName } = useAppContext();
    const factory = createFactory();

    const getHeuresticConstantValue = (name: (typeof ALGORITHM_TYPE_LIST)[number] | "") => {
        switch (name) {
            case "Dijkstra":
                return 0;
            case "A*":
                return 1;
            case "Greedy BFS":
                return 1;
            default:
                return 0;
        }
    };

    const handleTileColorChange = async (tile: TilePos, field: TileKey, newValue: TileType[TileKey]) => {
        const { pos_x, pos_y } = tile;
        if (isValidField(pos_x, pos_y, boardData.start) && isValidField(pos_x, pos_y, boardData.end)) {
            boardDispatch({
                type: "changeTile",
                pos_x: pos_x,
                pos_y: pos_y,
                field: field,
                newValue: newValue,
            });
            await delay(50);
        }
    };

    const handleColoringPath = async (path: string[], exists: boolean) => {
        for (let i = 0; i < path.length; i++) {
            if (!exists) {
                break;
            }
            const JSONItem = JSON.parse(path[i]);
            await handleTileColorChange(JSONItem, "type", "path");
        }
    };

    const findShortestPath = (prev: Map<string, string>, distances: Map<string, number>): [string[], boolean] => {
        const path: string[] = [];
        let currItem = JSON.stringify(boardData.end);
        while (true) {
            if (distances.get(currItem) === undefined || distances.get(currItem) === Infinity) {
                break;
            }
            let nextItem = prev.get(currItem);
            if (nextItem === undefined || nextItem === "") {
                break;
            }
            path.push(nextItem);
            currItem = nextItem;
        }
        return [path.reverse(), path.length > 0];
    };

    const findPath = (prev: Map<string, string>): [string[], boolean] => {
        const path: string[] = [];
        let currItem = JSON.stringify(boardData.end);

        while (prev.has(currItem)) {
            path.push(currItem);
            currItem = prev.get(currItem)!;
        }
        return [path.reverse(), path.length > 0];
    };

    const pathFindingAlgorithm = async (graph: GraphType, start: TilePos, end: TilePos) => {
        let graphKeys = Array.from(graph.keys());
        const distances = new Map<string, number>();
        const visited = new Set<string>();
        const prev = new Map<string, string>();
        const pq = new PriorityQueue<T>([], TileComparator);
        const heuresticConst = getHeuresticConstantValue(algorithmName);
        const heurestic = factory.getHeuristic(heuristicName);
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
            await handleTileColorChange(JSONItem, "type", "visited");

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
                const heuresticValue = heuresticConst * heurestic(neighbor, end);
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
        const [path, exists] = findShortestPath(prev, distances);
        console.log(graph);
        console.log("Path Lenght: ", path.length);
        console.log("Distances: ", distances);
        console.log("Prev ", prev);
        console.log("Path: ", path);
        await handleColoringPath(path, exists);
        exists ? alert("Finish") : alert(`Path doesn't exists`);
    };

    const greedyBFSAlgorith = async (graph: GraphType, start: TilePos, end: TilePos) => {
        const visited = new Set<string>();
        const prev = new Map<string, string>();
        const pq = new PriorityQueue<[number, string]>([], TileComparator);
        const heuresticConst = getHeuresticConstantValue(algorithmName);
        const heurestic = factory.getHeuristic(heuristicName);
        pq.insertValue([heuresticConst * heurestic(start, end), JSON.stringify(start)]);

        while (!pq.isEmpty()) {
            const [_, item] = pq.getHead();
            if (visited.has(item)) {
                continue;
            }
            visited.add(item);
            const JSONItem: TilePos = JSON.parse(item);
            await handleTileColorChange(JSONItem, "type", "visited");

            const neighbors = graph.get(item) || [];
            for (const neighbor of neighbors) {
                const JSONNeighbor = JSON.stringify(neighbor);
                if (visited.has(JSONNeighbor)) {
                    continue;
                }
                prev.set(JSONNeighbor, item);
                const heuristicValue = heuresticConst * heurestic(neighbor, end);
                pq.insertValue([heuristicValue, JSONNeighbor]);
            }
            if (item === JSON.stringify(end)) {
                break;
            }
        }
        const [path, exists] = findPath(prev);
        console.log(graph);
        console.log("Path Lenght: ", path.length);
        console.log("Prev ", prev);
        console.log("Path: ", path);
        await handleColoringPath(path, exists);
        exists ? alert("Finish") : alert(`Path doesn't exists`);
    };

    if (algorithmName === "Dijkstra" || algorithmName === "A*") {
        return pathFindingAlgorithm;
    }
    return greedyBFSAlgorith;
};
