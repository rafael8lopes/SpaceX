import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LaunchModel from "../../models/LaunchModel";

import "./launch.scss";
import { getRocketName } from "../../apis/SpaceXAPI";
import { useEffect, useState } from "react";

export default function Launch(props: { launch: LaunchModel }) {
  const { launch } = props;
  const [rocketName, setRocketName] = useState("");

  useEffect(() => {
    getRocketName(launch.rocket).then((name) => setRocketName(name));
  }, [props]);

  console.log(launch.success);

  return (
    <div className="Launch">
      <Typography variant="h6" color="inherit" component="div">
        {launch.name}
      </Typography>

      {launch.links.flickr.original.length > 0 && (
        <img
          className="LaunchImage"
          src={launch.links.flickr.original[0]}
          alt={launch.name}
        />
      )}

      <Typography variant="h6" color="inherit" component="div">
        {launch.launch_year}
      </Typography>

      <div className="IconAndText">
        <RocketLaunchIcon />

        <Typography variant="h6" color="inherit" component="div">
          {rocketName}
        </Typography>
      </div>

      <Typography variant="h6" color="inherit" component="div">
        {launch.date_utc.toString()}
      </Typography>

      <LaunchSuccess hasLaunchSuccessful={launch.success} />
    </div>
  );
}

function LaunchSuccess(props: { hasLaunchSuccessful: boolean | null }) {
  const { hasLaunchSuccessful } = props;

  if (hasLaunchSuccessful == null) {
    return <span>Unknown launch state</span>;
  }

  return (
    <div className="IconAndText">
      {hasLaunchSuccessful ? <DoneIcon /> : <DangerousIcon />}
      <span>
        {hasLaunchSuccessful ? "Successful launch" : "Unsuccessful launch"}
      </span>
    </div>
  );
}
