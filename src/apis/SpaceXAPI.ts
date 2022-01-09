import axios from "axios";
import { ApiResponse, errorResponse } from ".";
import Launch from "../models/Launch";

const baseUrl =
  process.env.REACT_APP_SPACEX_BASEURL ?? "https://api.spacexdata.com/v3";

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
