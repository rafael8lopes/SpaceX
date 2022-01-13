import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import UpdateIcon from "@mui/icons-material/Update";
import HistoryIcon from "@mui/icons-material/History";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BackspaceIcon from "@mui/icons-material/Backspace";
import LaunchFilterOptions from "../../models/LaunchFilterOptions";

import "./launchesFilter.scss";

export default function LaunchFilter(props: {
  filterOptions: (filter: LaunchFilterOptions) => void;
}) {
  const { filterOptions } = props;
  const [pastLaunchesFilter, setPastLaunchesFilter] = useState<boolean | null>(
    null
  );
  const [successfulLaunchesFilter, setSuccessfulLaunchesFilter] = useState<
    boolean | null
  >(null);
  const [favoriteLaunchesFilter, setFavoriteLaunchesFilter] = useState<
    boolean | null
  >(null);
  const [afterDateFilter, setAfterDateFilter] = useState<boolean>(true);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

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
    <div className="Filter">
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
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="text"
            onClick={() => setAfterDateFilter(!afterDateFilter)}
          >
            {afterDateFilter ? "After" : "Before"}
          </Button>

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

          {dateFilter && (
            <IconButton aria-label="clear" onClick={() => setDateFilter(null)}>
              <BackspaceIcon />
            </IconButton>
          )}
        </Stack>

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
