import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../stores";
import { getRocketName } from "../../apis/SpaceXAPI";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LaunchModel from "../../models/LaunchModel";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./launch.scss";

export default function Launch(props: { launch: LaunchModel }) {
  const { spacexStore } = useStores();

  const { launch } = props;

  const [rocketName, setRocketName] = useState("");
  const [isFavorite, setIsFavorite] = useState<boolean>(
    spacexStore.checkIsFavoriteLaunch(launch.id)
  );

  useEffect(() => {
    getRocketName(launch.rocket).then((name) => setRocketName(name));
  }, [props]);

  function handleFavClick(favValue: boolean) {
    if (favValue) {
      spacexStore.addFavoriteLaunch(launch.id);
    } else {
      spacexStore.removeFavoriteLaunch(launch.id);
    }

    setIsFavorite(favValue);
  }

  return (
    <div className="Launch">
      <div className="LaunchName">
        <Typography variant="h6" color="inherit" component="div">
          {launch.name}
        </Typography>

        <ToggleButtonGroup
          value={isFavorite}
          exclusive
          onChange={(e, favValue) => handleFavClick(favValue)}
        >
          <ToggleButton value={true} aria-label="add to favorites">
            <Tooltip title="Add to favorites">
              <FavoriteIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

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
