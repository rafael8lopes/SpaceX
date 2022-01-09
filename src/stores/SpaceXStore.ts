import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { RootStore } from ".";
import { getAllLaunches } from "../apis/SpaceXAPI";
import Launch from "../models/Launch";

export default class SpaceXStore {
  rootStore: RootStore;

  launches: Launch[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setLaunches(launches: Launch[]) {
    this.launches = launches;
  }

  loadLaunches() {
    getAllLaunches().then((resp) => {
      if (resp.success) {
        this.setLaunches(resp.data);
      } else {
        toast.error("Couldn't get the launches.");
      }
    });
  }
}
