import Typography from "@mui/material/Typography";
import Launch from "../../models/Launch";
// import Image from "mui-image";
import DoneIcon from "@mui/icons-material/Done";
import DangerousIcon from "@mui/icons-material/Dangerous";

const Image = require("mui-image");

export default function Launch(launch: Launch) {
  return (
    <div>
      <Typography variant="h6" color="inherit" component="div">
        {launch.mission_name}
      </Typography>

      {launch.links.flickr_images.length > 0 && (
        <Image src={launch.links.flickr_images[0]} />
      )}

      <Typography variant="h6" color="inherit" component="div">
        {launch.launch_year}
      </Typography>

      <Typography variant="h6" color="inherit" component="div">
        {launch.rocket.rocket_name}
      </Typography>

      <LaunchSuccess hasLaunchSuccessful={launch.launch_success} />
    </div>
  );
}

function LaunchSuccess(props: { hasLaunchSuccessful: boolean }) {
  const { hasLaunchSuccessful } = props;

  return (
    <div>
      {hasLaunchSuccessful ? DoneIcon : DangerousIcon}
      <span>
        {hasLaunchSuccessful ? "Successful launch" : "Unsuccessful launch"}
      </span>
    </div>
  );
}
