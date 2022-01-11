import Typography from "@mui/material/Typography";

import "./launchesFilter.scss";

export default function LaunchFilter() {
  return (
    <div>
      <Typography variant="h2" color="inherit" component="div" marginBottom={1}>
        Launches
      </Typography>

      <div className="FilterActions">filter actions</div>
    </div>
  );
}
