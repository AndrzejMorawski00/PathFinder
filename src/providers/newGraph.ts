import { TilePos, TileType, GraphType, Comparator, TileKey } from "../types";
import { PriorityQueue } from "./PriorityQueue";
import { useAppContext } from "../useContextHook";

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
        for (let j = 0; j < board[i].length; j++) {
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
                        isValidMove(neighbor.pos_x, -1, board.length) &&
                        isValidMove(neighbor.pos_y, -1, board[i].length) &&
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

export const useDijkstraAlgorithm = () => {
    const { boardDispatch, boardData } = useAppContext();

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

    const dijkstraAlgorithm = async (graph: GraphType, start: TilePos, end: TilePos) => {
        let graphKeys = Array.from(graph.keys());
        const distances = new Map<string, number>();
        const visited = new Set<string>();
        const prev = new Map<string, string>();
        const pq = new PriorityQueue<T>([], TileComparator);

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
                if (newDistance < (distances.get(JSONNeighbor) || Infinity)) {
                    distances.set(JSONNeighbor, newDistance);
                    prev.set(JSONNeighbor, item);
                    pq.insertValue([newDistance, JSONNeighbor]);
                }
            }
            if (item === JSON.stringify(end)) {
                break;
            }
        }
        const [path, exists] = findShortestPath(prev, distances);
        console.clear();
        console.log(graph);
        console.log("Path Lenght: ", path.length);
        console.log("Distances: ", distances);
        console.log("Prev ", prev);
        console.log("Path: ", path);
        for (let i = 0; i < path.length; i++) {
            if (!exists) {
                break;
            }
            const JSONItem = JSON.parse(path[i]);
            await handleTileColorChange(JSONItem, "type", "path");
        }

        alert("Finish");
    };

    return dijkstraAlgorithm;
};

export const useAStarAlgorithm = () => {
    const { boardDispatch, boardData } = useAppContext();

    // const manhattanDistance = (pos1: TilePos, pos2: TilePos, constantValue: number): number => {
    //     return constantValue * (Math.abs(pos1.pos_x - pos2.pos_x) + Math.abs(pos1.pos_y - pos2.pos_y));
    // };

    // const euclideanDistance = (pos1: TilePos, pos2: TilePos, constantValue: number): number => {
    //     return constantValue * Math.sqrt(Math.pow(pos1.pos_x - pos2.pos_x, 2) + Math.pow(pos1.pos_y - pos2.pos_y, 2));
    // };

    const weightedManhattanDistance = (pos1: TilePos, pos2: TilePos, constantValue: number): number => {
        const dx = Math.abs(pos1.pos_x - pos2.pos_x);
        const dy = Math.abs(pos1.pos_y - pos2.pos_y);
        const D = 1; // Cost for moving in the same row/column
        const D2 = 1.4; // Cost for moving diagonally
        return constantValue * (D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy));
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

    const aStarAlgorithm = async (graph: GraphType, start: TilePos, end: TilePos) => {
        let graphKeys = Array.from(graph.keys());
        const distances = new Map<string, number>();
        const visited = new Set<string>();
        const prev = new Map<string, string>();
        const pq = new PriorityQueue<[number, string]>([], TileComparator);

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
                const heuristic = weightedManhattanDistance(neighbor, end, 1);
                if (newDistance < (distances.get(JSONNeighbor) || Infinity)) {
                    distances.set(JSONNeighbor, newDistance);
                    prev.set(JSONNeighbor, item);
                    pq.insertValue([newDistance + heuristic, JSONNeighbor]);
                }
            }
            if (item === JSON.stringify(end)) {
                break;
            }
        }

        const [path, exists] = findShortestPath(prev, distances);
        console.clear();
        console.log(graph);
        console.log("Path Lenght: ", path.length);
        console.log("Distances: ", distances);
        console.log("Prev ", prev);
        console.log("Path: ", path);
        for (let i = 0; i < path.length; i++) {
            if (!exists) {
                break;
            }
            const JSONItem = JSON.parse(path[i]);
            await handleTileColorChange(JSONItem, "type", "path");
        }

        alert("Finish");
    };
    return aStarAlgorithm;
};

export const useGreedyBFSAlgorithm = () => {
    const { boardDispatch, boardData } = useAppContext();

    // const manhattanDistance = (pos1: TilePos, pos2: TilePos, constantValue: number): number => {
    //     return constantValue * (Math.abs(pos1.pos_x - pos2.pos_x) + Math.abs(pos1.pos_y - pos2.pos_y));
    // };

    // const euclideanDistance = (pos1: TilePos, pos2: TilePos, constantValue: number): number => {
    //     return constantValue * Math.sqrt(Math.pow(pos1.pos_x - pos2.pos_x, 2) + Math.pow(pos1.pos_y - pos2.pos_y, 2));
    // };

    const weightedManhattanDistance = (pos1: TilePos, pos2: TilePos, constantValue: number): number => {
        const dx = Math.abs(pos1.pos_x - pos2.pos_x);
        const dy = Math.abs(pos1.pos_y - pos2.pos_y);
        const D = 1; // Cost for moving in the same row/column
        const D2 = 1.4; // Cost for moving diagonally
        return constantValue * (D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy));
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

    const greedyBFSAlgorith = async (graph: GraphType, start: TilePos, end: TilePos) => {
        const visited = new Set<string>();
        const prev = new Map<string, string>();
        const pq = new PriorityQueue<[number, string]>([], TileComparator);
        pq.insertValue([weightedManhattanDistance(start, end, 1), JSON.stringify(start)]);

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
                const heuristic = weightedManhattanDistance(neighbor, end, 1);
                pq.insertValue([heuristic, JSONNeighbor]);
            }
            if (item === JSON.stringify(end)) {
                break;
            }
        }
        const [path, exists] = findPath(prev);
        console.clear();
        console.log(graph);
        console.log("Path Lenght: ", path.length);

        console.log("Prev ", prev);
        console.log("Path: ", path);
        for (let i = 0; i < path.length; i++) {
            if (!exists) {
                break;
            }
            const JSONItem = JSON.parse(path[i]);
            await handleTileColorChange(JSONItem, "type", "path");
        }

        alert("Finish");
    };

    const findPath = (prev: Map<string, string>): [string[], boolean] => {
        const path: string[] = [];
        let currItem = JSON.stringify(boardData.end);

        while (prev.has(currItem)) {
            path.push(currItem);
            currItem = prev.get(currItem)!;
        }
        return [path, path.length > 0];
    };

    return greedyBFSAlgorith;
};
