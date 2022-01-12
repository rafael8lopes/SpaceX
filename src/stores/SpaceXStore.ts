import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { RootStore } from ".";
import { getAllLaunches } from "../apis/SpaceXAPI";
import LaunchModel from "../models/LaunchModel";

export default class SpaceXStore {
  rootStore: RootStore;

  launches: LaunchModel[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  getLaunches() {
    return this.launches;
  }

  setLaunches(launches: LaunchModel[]) {
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
