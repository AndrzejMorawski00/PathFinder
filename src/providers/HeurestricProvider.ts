import { Heurestic } from "../types";

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
