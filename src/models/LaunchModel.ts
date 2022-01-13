import Rocket from "./RocketModel";

export default interface LaunchModel {
  flight_number: number;
  name: string;
  launch_year: number; // mission year
  success: boolean | null;
  rocket: string;
  links: {
    flickr: {
      original: string[];
    };
  };

  date_utc: number;
}
