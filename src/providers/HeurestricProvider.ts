import { TilePos, Heurestic } from "../types";

export class HeuresticFactory {
    private heuresticDict: Map<string, Heurestic>;
    constructor() {
        this.heuresticDict = new Map();
    }

    public getHeurestic(heuresticName: string) {
        const heurestic = this.heuresticDict.get(heuresticName);
        if (heurestic === undefined) {
            throw new Error("Invalid Heurestic Name");
        }
        return heurestic;
    }

    public addHeurestic(heuresticName: string, heurestic: Heurestic) {
        if (this.heuresticDict.get(heuresticName)) {
            throw new Error("Heuresic is already in dict");
        }
        this.heuresticDict.set(heuresticName, heurestic);
    }
}

export const defaultHeurestic = (_pos1: TilePos, _pos2: TilePos): number => {
    return 0;
};

export const oneHeurestic = (_pos1: TilePos, _pos2: TilePos): number => {
    return 1;
};

export const manhattanDistance = (pos1: TilePos, pos2: TilePos): number => {
    return Math.abs(pos1.pos_x - pos2.pos_x) + Math.abs(pos1.pos_y - pos2.pos_y);
};

export const euclideanDistance = (pos1: TilePos, pos2: TilePos): number => {
    return Math.sqrt(Math.pow(pos1.pos_x - pos2.pos_x, 2) + Math.pow(pos1.pos_y - pos2.pos_y, 2));
};

export const weightedManhattanDistance = (pos1: TilePos, pos2: TilePos): number => {
    const dx = Math.abs(pos1.pos_x - pos2.pos_x);
    const dy = Math.abs(pos1.pos_y - pos2.pos_y);
    const D = 1; // Cost for moving in the same row/column
    const D2 = 1.4; // Cost for moving diagonally
    return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
};

export const createFactory = () => {
    const factory = new HeuresticFactory();
    factory.addHeurestic("zero", defaultHeurestic);
    factory.addHeurestic("one", oneHeurestic);
    factory.addHeurestic("Manhattan Distance", manhattanDistance);
    factory.addHeurestic("Euclidean Distance", euclideanDistance);
    factory.addHeurestic("Weighted Manhattan Distance", weightedManhattanDistance);
    return factory;
};
