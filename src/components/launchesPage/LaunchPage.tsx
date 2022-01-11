import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../stores";
import LaunchModel from "../../models/LaunchModel";
import LaunchFilter from "../launchFilter/LaunchesFilter";
import Launch from "../launch/Launch";
import Grid from "@mui/material/Grid";

import "./launchPage.scss";

export const LaunchPage = observer(() => {
  const { spacexStore } = useStores();

  const [firstElement, setFirstElement] = useState(0);

  let previousScrollTop: number = 0;

  useEffect(() => {
    spacexStore.loadLaunches();
  }, []);

  return (
    <div className="LaunchPage">
      <LaunchFilter />

      <div className="LaunchesGrid">
        <Grid container rowSpacing={50} columnSpacing={10}>
          {spacexStore.launches.map((launch: LaunchModel, index: number) => (
            <Grid item xs={3} key={index}>
              <Launch key={launch.flight_number} launch={launch} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
});
