import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../stores";
import { getRocketName } from "../../apis/SpaceXAPI";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LaunchModel from "../../models/LaunchModel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";

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

  function handleFavClick() {
    if (!isFavorite) {
      spacexStore.addFavoriteLaunch(launch.id);
    } else {
      spacexStore.removeFavoriteLaunch(launch.id);
    }

    setIsFavorite(!isFavorite);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            className="Z-Index-1"
            aria-label="launch patch"
            src={launch.links.patch.small}
          />
        }
        title={
          <div className="LaunchName">
            <span>{launch.name}</span>
            <IconButton
              className="Z-Index-1"
              aria-label="add to favorites"
              size="small"
              onClick={() => handleFavClick()}
              color={isFavorite ? "error" : "default"}
            >
              <FavoriteIcon />
            </IconButton>
          </div>
        }
        subheader={new Date(launch.date_utc).getFullYear()}
      />

      {launch.links.flickr.original.length > 0 && (
        <CardMedia
          alt="launch image"
          component="img"
          height="194"
          image={launch.links.flickr.original[0]}
        />
      )}

      <CardContent>
        <div className="IconAndText">
          <RocketLaunchIcon />
          <Typography variant="h6" color="inherit" component="div">
            {rocketName}
          </Typography>
        </div>

        <LaunchSuccess hasLaunchSuccessful={launch.success} />
      </CardContent>
    </Card>
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
