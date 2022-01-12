import { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import UpdateIcon from "@mui/icons-material/Update";
import HistoryIcon from "@mui/icons-material/History";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LaunchFilterOptions from "../../models/LaunchFilterOptions";

import "./launchesFilter.scss";

export default function LaunchFilter(props: {
  filterOptions: (filter: LaunchFilterOptions) => void;
}) {
  const { filterOptions } = props;
  const [pastLaunchesFilter, setPastLaunchesFilter] = useState(null);
  const [successfulLaunchesFilter, setSuccessfulLaunchesFilter] =
    useState(null);
  const [favoriteLaunchesFilter, setFavoriteLaunchesFilter] = useState(null);
  const [afterDateFilter, setAfterDateFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);

  useEffect(() => {
    filterOptions({
      afterDate: afterDateFilter,
      date: dateFilter,
      pastLaunches: pastLaunchesFilter,
      successfulLaunches: successfulLaunchesFilter,
      favoriteLaunches: favoriteLaunchesFilter,
    });
  }, [
    afterDateFilter,
    dateFilter,
    pastLaunchesFilter,
    successfulLaunchesFilter,
    favoriteLaunchesFilter,
  ]);

  return (
    <div>
      <Typography
        variant="h2"
        color="inherit"
        component="div"
        marginBottom={1}
        textAlign={"center"}
      >
        Launches
      </Typography>

      <div className="FilterActions">
        <div>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              label="Date"
              value={dateFilter}
              onChange={(newDate: any) => {
                setDateFilter(newDate);
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <ToggleButtonGroup
          value={pastLaunchesFilter}
          exclusive
          onChange={(e, newFormats) => setPastLaunchesFilter(newFormats)}
          aria-label="past launches filter"
        >
          <ToggleButton value={false} aria-label="upcoming launches">
            <Tooltip title="Upcoming launches">
              <UpdateIcon />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={true} aria-label="last launches">
            <Tooltip title="Last launches">
              <HistoryIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={successfulLaunchesFilter}
          exclusive
          onChange={(e, newFormats) => setSuccessfulLaunchesFilter(newFormats)}
          aria-label="successful launches filter"
        >
          <ToggleButton value={true} aria-label="successful launches">
            <Tooltip title="Successful launches">
              <DoneIcon />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={false} aria-label="unsuccessful launches">
            <Tooltip title="Unsuccessful launches">
              <DangerousIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={favoriteLaunchesFilter}
          exclusive
          onChange={(e, newFormats) => setFavoriteLaunchesFilter(newFormats)}
          aria-label="favorite launches filter"
        >
          <ToggleButton value={true} aria-label="favorite launches">
            <Tooltip title="Favorite launches">
              <FavoriteIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
