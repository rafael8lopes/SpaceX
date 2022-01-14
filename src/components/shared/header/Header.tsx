import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import logo from "../../../assets/spacex-logo.png";

import "./header.scss";

export function Header() {
  return (
    <AppBar position="fixed" className="Header">
      <Typography variant="h6" color="inherit" component="div">
        <img src={logo} alt="SpaceX logo" className="Logo"></img>
      </Typography>
    </AppBar>
  );
}
