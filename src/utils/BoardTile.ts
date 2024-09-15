import { TileTypes } from "../types/TileTypes";

export const getClassName = (type: TileTypes): string => {
    switch (type) {
        case "start":
            return "bg-green-500";
        case "end":
            return "bg-red-500";
        case "obstacle":
            return "bg-gray-500";
        case "visited":
            return "bg-yellow-300";
        case "path":
            return "bg-blue-500";
        default:
            return "bg-gray-200";
    }
};