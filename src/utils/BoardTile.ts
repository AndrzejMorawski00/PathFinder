import { TileTypes } from "../types/TileTypes";

export const getTileBackgroundColorName = (type: TileTypes): string => {
    switch (type) {
        case "start":
            return "bg-startPoint";
        case "end":
            return "bg-endPoint";
        case "obstacle":
            return "bg-obstacles";
        case "visited":
            return "bg-visited";
        case "path":
            return "bg-path";
        default:
            return "bg-boardBackground";
    }
};
