import { createContext, useContext } from "react";
import SpaceXStore from "./SpaceXStore";


export class RootStore {
    spacexStore: SpaceXStore;

    constructor() {
        this.spacexStore = new SpaceXStore(this)
    }
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);