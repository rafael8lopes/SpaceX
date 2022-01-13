import axios from "axios";
import { ApiResponse, errorResponse } from ".";
import Launch from "../models/LaunchModel";
import Rocket from "../models/RocketModel";

const baseUrl =
  process.env.REACT_APP_SPACEX_BASEURL ?? "https://api.spacexdata.com/v4";

const instance = axios.create({
  baseURL: baseUrl,
});

export async function getAllLaunches(): Promise<ApiResponse<Launch[]>> {
  try {
    const response = await instance.get("/launches");

    return { success: true, data: response.data };
  } catch (e: any) {
    console.error("Get SpaceX launches error", e);
    return errorResponse(e);
  }
}

// TO-DO Rockets store
// export async function getRocketByName(
//   rocketId: string
// ): Promise<ApiResponse<Rocket>> {
//   try {
//     const response = await instance.get("/rockets/" + rocketId);

//     return { success: true, data: response.data };
//   } catch (e: any) {
//     console.error("Get SpaceX rocket error", e);
//     return errorResponse(e);
//   }
// }

export async function getRocketName(rocketId: string): Promise<string> {
  try {
    const response = await instance.get("/rockets/" + rocketId);

    return response.data.name;
  } catch (e: any) {
    console.error("Get SpaceX rocket error", e);
    return "N/A";
  }
}
