import Rocket from "./RocketModel";

export default interface LaunchModel {
  id: string;
  name: string;
  success: boolean | null;
  rocket: string;
  date_utc: number;
  links: {
    patch: {
      small: string;
    };
    flickr: {
      original: string[];
    };
  };
}
