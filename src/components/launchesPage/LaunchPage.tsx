import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../stores";
import { isAfter } from "date-fns";
import Grid from "@mui/material/Grid";
import Launch from "../launch/Launch";
import LaunchModel from "../../models/LaunchModel";
import LaunchFilter from "../launchFilter/LaunchesFilter";
import LaunchFilterOptions from "../../models/LaunchFilterOptions";

import "./launchPage.scss";

export const LaunchPage = observer(() => {
  const { spacexStore } = useStores();
  const [launchesList, setLaunchesList] = useState<LaunchModel[]>([]);

  const gridItemWidth = resolveGridItemWidth();

  useEffect(() => {
    spacexStore.loadFavLaunchesId();
    spacexStore.loadLaunches();
  }, []);

  useEffect(() => {
    setLaunchesList(spacexStore.launches);
  }, [spacexStore.launches]);

  function resolveGridItemWidth() {
    switch (launchesList.length) {
      case 3:
        return 4;
      case 2:
        return 6;
      case 1:
        return 12;
      default:
        return 3;
    }
  }

  function handleFilter(filterOptions: LaunchFilterOptions) {
    const {
      afterDate,
      date,
      pastLaunches,
      successfulLaunches,
      favoriteLaunches,
    } = filterOptions;

    let filteredLaunches = spacexStore.getLaunches();

    if (afterDate != null && date) {
      filteredLaunches = filteredLaunches.filter((l) =>
        afterDate
          ? isAfter(new Date(l.date_utc).getTime(), date.getTime())
          : !isAfter(new Date(l.date_utc).getTime(), date.getTime())
      );
    }
    if (pastLaunches != null) {
      const currentDate = Date.now();

      filteredLaunches = filteredLaunches.filter((l) =>
        pastLaunches
          ? !isAfter(new Date(l.date_utc).getTime(), currentDate)
          : isAfter(new Date(l.date_utc).getTime(), currentDate)
      );
    }
    if (successfulLaunches != null) {
      filteredLaunches = filteredLaunches.filter(
        (l) => l.success == successfulLaunches
      );
    }
    if (favoriteLaunches != null) {
      const favLaunches = spacexStore.getFavLaunchesId();

      filteredLaunches = filteredLaunches.filter(({ id }) =>
        favLaunches.includes(id)
      );
    }

    setLaunchesList(filteredLaunches);
  }

  return (
    <div className="LaunchPage">
      <LaunchFilter filterOptions={handleFilter} />

      <div className="LaunchesGrid">
        <Grid container rowSpacing={20} columnSpacing={10}>
          {launchesList.map((launch: LaunchModel, index: number) => (
            <Grid item xs={gridItemWidth} key={index}>
              <Launch key={launch.id} launch={launch} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
});
