import { TilePos, TileType, GraphType, Comparator } from "../types";

import { PriorityQueue } from "./PriorityQueue";

import { useAppContext } from "../useContextHook";

const TileComparator: Comparator<[number, string]> = (a: [number, string], b: [number, string]) => {
    return a[0] < b[0];
};

const isValidMove = (field: number, minVal: number, maxVal: number) => {
    return minVal <= field && field <= maxVal;
};

const isValidField = (pos_x: number, pos_y: number, field: TilePos) => {
    return !(pos_x == field.pos_x && pos_y == field.pos_y);
};

const delay = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

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
                        isValidMove(neighbor.pos_x, 0, board.length - 1) &&
                        isValidMove(neighbor.pos_y, 0, board[i].length - 1) &&
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
    const dijkstraAlgorithm = async (graph: GraphType, start: TilePos, end: TilePos) => {
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
            const [minVal, item] = pq.getHead();
            if (visited.has(item)) {
                continue;
            }

            visited.add(item);
            const JSONItem: TilePos = JSON.parse(item);
            if (
                isValidField(JSONItem.pos_x, JSONItem.pos_y, boardData.start) &&
                isValidField(JSONItem.pos_x, JSONItem.pos_y, boardData.end)
            ) {
                boardDispatch({
                    type: "changeTile",
                    pos_x: JSONItem.pos_x,
                    pos_y: JSONItem.pos_y,
                    field: "type",
                    newValue: "visited",
                });
                await delay(50);
            }
            let itemDistance = distances.get(item);
            if (itemDistance === undefined) {
                itemDistance = Infinity;
            }
            // czy to jest potrzebne?
            if (itemDistance < minVal) {
                continue;
            }
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
        console.log("Path Lenght: ", path.length);
        console.log("Distances: ", distances);
        console.log("Prev ", prev);
        console.log("Path: ", path);

        for (let i = 0; i < path.length; i++) {
            if (!exists) {
                break;
            }
            const JSONItem = JSON.parse(path[i]);
            if (i !== 0 && i !== path.length - 1) {
                boardDispatch({
                    type: "changeTile",
                    pos_x: JSONItem.pos_x,
                    pos_y: JSONItem.pos_y,
                    field: "type",
                    newValue: "path",
                });
                await delay(50);
            }
        }
        alert("Finish");
    };

    const findShortestPath = (prev: Map<string, string>, distances: Map<string, number>): [string[], boolean] => {
        const path: string[] = [];
        let exists = false;
        let currItem = JSON.stringify(boardData.end);
        if (distances.get(currItem) === undefined || distances.get(currItem) === Infinity) {
            return [path, false];
        }
        path.push(currItem);
        console.log(path);
        while (true) {
            let nextItem = prev.get(currItem);
            if (nextItem === undefined || nextItem === "") {
                break;
            } else {
                path.push(nextItem);
            }
            currItem = nextItem;
        }
        if (path[path.length - 1] === JSON.stringify(boardData.start)) {
            exists = true;
        }
        return [path.reverse(), exists];
    };
    // Algorytm nie zawsze się kończy, dlaczego?

    return dijkstraAlgorithm;
};

export const useAStarAlgorithm = () => {
    const { boardDispatch, boardData } = useAppContext();

    const manhattanDistance = (pos1: TilePos, pos2: TilePos, constantValue: number): number => {
        return Math.abs(pos1.pos_x - pos2.pos_x) + Math.abs(pos1.pos_y - pos2.pos_y);
        // return constantValue * Math.sqrt(Math.pow(pos1.pos_x - pos2.pos_x, 2) + Math.pow(pos1.pos_y - pos2.pos_y, 2));
    };

    const euclideanDistance = (pos1: TilePos, pos2: TilePos): number => {
        return Math.sqrt(Math.pow(pos1.pos_x - pos2.pos_x, 2) + Math.pow(pos1.pos_y - pos2.pos_y, 2));
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
            if (
                isValidField(JSONItem.pos_x, JSONItem.pos_y, boardData.start) &&
                isValidField(JSONItem.pos_x, JSONItem.pos_y, boardData.end)
            ) {
                boardDispatch({
                    type: "changeTile",
                    pos_x: JSONItem.pos_x,
                    pos_y: JSONItem.pos_y,
                    field: "type",
                    newValue: "visited",
                });
                await delay(50);
            }
            let itemDistance = distances.get(item);
            if (itemDistance === undefined) {
                itemDistance = Infinity;
            }
            // czy to jest potrzebne?
            // if (itemDistance < minVal) {
            //     continue;
            // }
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
                const heuristic = manhattanDistance(neighbor, end, 1);
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
        console.log("Path Lenght: ", path.length);
        console.log("Distances: ", distances);
        console.log("Prev ", prev);
        console.log("Path: ", path);

        for (let i = 0; i < path.length; i++) {
            if (!exists) {
                break;
            }
            const JSONItem = JSON.parse(path[i]);
            if (i !== 0 && i !== path.length - 1) {
                boardDispatch({
                    type: "changeTile",
                    pos_x: JSONItem.pos_x,
                    pos_y: JSONItem.pos_y,
                    field: "type",
                    newValue: "path",
                });
                await delay(50);
            }
        }
        alert("Finish");
    };

    // Helper function to find the shortest path from the `prev` map

    // const aStarAlgorithm = async (graph: GraphType, start: TilePos, end: TilePos) => {
    //     const distances = new Map<string, number>();
    //     const visited = new Set<string>();
    //     const prev = new Map<string, string>();
    //     const pq = new PriorityQueue<[number, string]>([], TileComparator);

    //     const startKey = JSON.stringify(start);
    //     const endKey = JSON.stringify(end);

    //     for (const key of graph.keys()) {
    //         distances.set(key, Infinity);
    //         prev.set(key, "");
    //     }

    //     distances.set(startKey, 0);
    //     pq.insertValue([0, startKey]);

    //     while (!pq.isEmpty()) {
    //         const [_, item] = pq.getHead();

    //         if (visited.has(item)) {
    //             continue;
    //         }

    //         visited.add(item);
    //         const JSONItem: TilePos = JSON.parse(item);

    //         if (
    //             isValidField(JSONItem.pos_x, JSONItem.pos_y, boardData.start) &&
    //             isValidField(JSONItem.pos_x, JSONItem.pos_y, boardData.end)
    //         ) {
    //             boardDispatch({
    //                 type: "changeTile",
    //                 pos_x: JSONItem.pos_x,
    //                 pos_y: JSONItem.pos_y,
    //                 field: "type",
    //                 newValue: "visited",
    //             });
    //             await delay(50);
    //         }

    //         if (item === endKey) {
    //             break;
    //         }

    //         let itemDistance = distances.get(item);
    //         if (itemDistance === undefined) {
    //             itemDistance = Infinity;
    //         }

    //         const neighbors = graph.get(item) || [];
    //         for (const neighbor of neighbors) {
    //             const neighborKey = JSON.stringify(neighbor);
    //             if (visited.has(neighborKey)) {
    //                 continue;
    //             }

    //             const newDistance = itemDistance + 1;
    //             const heuristic = manhattanDistance(neighbor, end);

    //             if (newDistance < (distances.get(neighborKey) || Infinity)) {
    //                 distances.set(neighborKey, newDistance);
    //                 prev.set(neighborKey, item);
    //                 pq.insertValue([newDistance + heuristic, neighborKey]);
    //             }
    //         }
    //     }

    //     const [path, exists] = findShortestPath(prev, distances, startKey, endKey);
    //     console.log("Distances: ", distances);
    //     console.log("Prev: ", prev);
    //     console.log("Path: ", path);

    //     for (let i = 0; i < path.length; i++) {
    //         if (!exists) {
    //             break;
    //         }
    //         const JSONItem = JSON.parse(path[i]);
    //         if (i !== 0 && i !== path.length - 1) {
    //             boardDispatch({
    //                 type: "changeTile",
    //                 pos_x: JSONItem.pos_x,
    //                 pos_y: JSONItem.pos_y,
    //                 field: "type",
    //                 newValue: "path",
    //             });
    //             await delay(50);
    //         }
    //     }
    //     alert("Finish");
    // };

    const findShortestPath = (prev: Map<string, string>, distances: Map<string, number>): [string[], boolean] => {
        const path: string[] = [];
        let exists = false;
        let currItem = JSON.stringify(boardData.end);
        if (distances.get(currItem) === undefined || distances.get(currItem) === Infinity) {
            return [path, false];
        }
        path.push(currItem);
        console.log(path);
        while (true) {
            let nextItem = prev.get(currItem);
            if (nextItem === undefined || nextItem === "") {
                break;
            } else {
                path.push(nextItem);
            }
            currItem = nextItem;
        }
        if (path[path.length - 1] === JSON.stringify(boardData.start)) {
            exists = true;
        }
        return [path.reverse(), exists];
    };

    return aStarAlgorithm;
};

export const useGreedyBFSAlgorithm = () => {
    const weightedManhattanDistance = (pos1: TilePos, pos2: TilePos): number => {
        const dx = Math.abs(pos1.pos_x - pos2.pos_x);
        const dy = Math.abs(pos1.pos_y - pos2.pos_y);
        const D = 1; // Cost for moving in the same row/column
        const D2 = 1.4; // Cost for moving diagonally
        return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
    };

    const { boardDispatch, boardData } = useAppContext();
    const greedyBFS = async (graph: GraphType, start: TilePos, end: TilePos) => {
        const visited = new Set<string>();
        const prev = new Map<string, string>();
        const pq = new PriorityQueue<[number, string]>([], TileComparator);

        pq.insertValue([weightedManhattanDistance(start, end), JSON.stringify(start)]);

        while (!pq.isEmpty()) {
            const [_, item] = pq.getHead();
            if (visited.has(item)) {
                continue;
            }

            visited.add(item);
            const JSONItem: TilePos = JSON.parse(item);

            if (
                isValidField(JSONItem.pos_x, JSONItem.pos_y, boardData.start) &&
                isValidField(JSONItem.pos_x, JSONItem.pos_y, boardData.end)
            ) {
                boardDispatch({
                    type: "changeTile",
                    pos_x: JSONItem.pos_x,
                    pos_y: JSONItem.pos_y,
                    field: "type",
                    newValue: "visited",
                });
                await delay(50);
            }

            if (item === JSON.stringify(end)) {
                break;
            }

            const neighbors = graph.get(item) || [];

            for (const neighbor of neighbors) {
                const JSONNeighbor = JSON.stringify(neighbor);
                if (visited.has(JSONNeighbor)) {
                    continue;
                }
                prev.set(JSONNeighbor, item);
                const heuristic = weightedManhattanDistance(neighbor, end);
                pq.insertValue([heuristic, JSONNeighbor]);
            }
        }
        const [path, exists] = findShortestPathv1(prev);
        console.log("Path Length: ", path.length + 1);
        console.log("Prev ", prev);
        console.log("Path: ", path);

        for (let i = 0; i < path.length; i++) {
            if (!exists) {
                break;
            }
            const JSONItem = JSON.parse(path[i]);
            if (i !== 0 && i !== path.length - 1) {
                boardDispatch({
                    type: "changeTile",
                    pos_x: JSONItem.pos_x,
                    pos_y: JSONItem.pos_y,
                    field: "type",
                    newValue: "path",
                });
                await delay(50);
            }
        }
        alert("Finish");
        function findShortestPathv1(prev: Map<string, string>): [string[], boolean] {
            const path: string[] = [];
            let current = JSON.stringify(end);
            while (prev.has(current)) {
                path.push(current);
                current = prev.get(current)!;
            }
            path.push(JSON.stringify(start));
            path.reverse();
            return [path, path.length > 1];
        }
    };

    return greedyBFS;
};
