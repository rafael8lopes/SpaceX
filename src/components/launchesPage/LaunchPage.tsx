import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Grid from "@mui/material/Grid";
import { useStores } from "../../stores";
import Launch from "../launch/Launch";
import LaunchModel from "../../models/LaunchModel";
import LaunchFilter from "../launchFilter/LaunchesFilter";
import LaunchFilterOptions from "../../models/LaunchFilterOptions";

import "./launchPage.scss";

export const LaunchPage = observer(() => {
  const { spacexStore } = useStores();

  const [launchesList, setLaunchesList] = useState<LaunchModel[]>([]);

  useEffect(() => {
    spacexStore.loadLaunches();
  }, []);

  useEffect(() => {
    setLaunchesList(spacexStore.launches);
  }, [spacexStore.launches]);

  // TODO - filter logic
  function handleFilter(filterOptions: LaunchFilterOptions) {
    const {
      afterDate,
      date,
      pastLaunches,
      successfulLaunches,
      favoriteLaunches,
    } = filterOptions;

    let filteredLaunches = spacexStore.getLaunches();

    if (afterDate != undefined && afterDate != null) {
      filteredLaunches = filteredLaunches.filter((l) => l.flight_number == 1);
    }
    if (pastLaunches != undefined && pastLaunches != null) {
      filteredLaunches = filteredLaunches.filter((l) => l.flight_number == 1);
    }
    if (successfulLaunches != undefined && successfulLaunches != null) {
      filteredLaunches = filteredLaunches.filter(
        (l) => l.launch_success == successfulLaunches
      );
    }
    if (favoriteLaunches != undefined && favoriteLaunches != null) {
      filteredLaunches = filteredLaunches.filter((l) => l.flight_number == 1);
    }

    setLaunchesList(filteredLaunches);
  }

  return (
    <div className="LaunchPage">
      <LaunchFilter filterOptions={handleFilter} />

      <div className="LaunchesGrid">
        <Grid container rowSpacing={60} columnSpacing={10}>
          {launchesList.map((launch: LaunchModel, index: number) => (
            <Grid item xs={3} key={index}>
              <Launch key={launch.flight_number} launch={launch} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
});
