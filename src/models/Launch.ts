import Rocket from "./Rocket";

export default interface Launch {
  flight_number: number; // launch number
  mission_name: string;
  launch_year: number; // mission year
  launch_success: boolean; // mission success
  rocket: Rocket;
  links: LaunchLinks;
}

interface LaunchLinks {
  flickr_images: string[];
}
