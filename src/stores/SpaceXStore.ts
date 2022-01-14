import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { RootStore } from ".";
import { getAllLaunches } from "../apis/SpaceXAPI";
import LaunchModel from "../models/LaunchModel";

export default class SpaceXStore {
  private favLaunchesKey: string = "favoriteLaunches";
  rootStore: RootStore;

  launches: LaunchModel[] = [];
  favLaunchesId: string[] = [];

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

  getFavLaunchesId() {
    return this.favLaunchesId;
  }

  setFavLaunchesId(favLaunchesId: string[]) {
    this.favLaunchesId = favLaunchesId;

    localStorage.setItem(this.favLaunchesKey, JSON.stringify(favLaunchesId));
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

  loadFavLaunchesId() {
    const favLaunchesValue = localStorage.getItem(this.favLaunchesKey);

    if (favLaunchesValue) {
      const favLaunchesList = JSON.parse(favLaunchesValue);

      if (Array.isArray(favLaunchesList)) {
        this.setFavLaunchesId(favLaunchesList);
        return;
      }
    }

    this.setFavLaunchesId([]);
  }

  checkIsFavoriteLaunch(launchId: string) {
    const favoriteLaunches = this.getFavLaunchesId();

    return favoriteLaunches.includes(launchId);
  }

  addFavoriteLaunch(launchId: string) {
    const favoriteLaunches = this.getFavLaunchesId();

    if (!favoriteLaunches.includes(launchId)) {
      favoriteLaunches.push(launchId);
    }

    this.setFavLaunchesId(favoriteLaunches);
  }

  removeFavoriteLaunch(launchId: string) {
    let favoriteLaunches = this.getFavLaunchesId();

    favoriteLaunches = favoriteLaunches.filter((item) => item !== launchId);

    this.setFavLaunchesId(favoriteLaunches);
  }
}
