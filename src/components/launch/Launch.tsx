import Typography from "@mui/material/Typography";
// import Image from "mui-image";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LaunchModel from "../../models/LaunchModel";

import "./launch.scss";

export default function Launch(props: { launch: LaunchModel }) {
  const { launch } = props;

  console.log(
    "Image",
    launch.links.flickr_images.length > 0
      ? launch.links.flickr_images[0]
      : "None"
  );

  return (
    <div className="Launch">
      <Typography variant="h6" color="inherit" component="div">
        {launch.mission_name}
      </Typography>

      {launch.links.flickr_images.length > 0 && (
        <img
          className="LaunchImage"
          src={launch.links.flickr_images[0]}
          alt={launch.mission_name}
        />
      )}

      <Typography variant="h6" color="inherit" component="div">
        {launch.launch_year}
      </Typography>

      <div className="IconAndText">
        <RocketLaunchIcon />

        <Typography variant="h6" color="inherit" component="div">
          {launch.rocket.rocket_name}
        </Typography>
      </div>

      <LaunchSuccess hasLaunchSuccessful={launch.launch_success} />
    </div>
  );
}

function LaunchSuccess(props: { hasLaunchSuccessful: boolean }) {
  const { hasLaunchSuccessful } = props;

  return (
    <div className="IconAndText">
      {hasLaunchSuccessful ? <DoneIcon /> : <DangerousIcon />}
      <span>
        {hasLaunchSuccessful ? "Successful launch" : "Unsuccessful launch"}
      </span>
    </div>
  );
}
