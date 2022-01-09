import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

import "./header.scss";

export function Header() {
  return (
    <AppBar position="static" className="Header">
      <Typography variant="h6" color="inherit" component="div">
        SpaceX Launches
      </Typography>
    </AppBar>
  );
}
