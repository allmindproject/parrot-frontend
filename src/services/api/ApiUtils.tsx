import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import ApiError from "./ApiError";

const BASE_URL = "http://localhost:8080";

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

async function apiRequest<T>(
  method: string,
  url: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  const config: AxiosRequestConfig = {
    method,
    url: BASE_URL + url,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    data: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response: AxiosResponse<T> = await axios(config);

    if (response.data) {
      const responseData: string = response.data.toString();
      if (responseData.startsWith("<!DOCTYPE html>")) {
        throw new ApiError("Not Logged in", null, 401, "Unauthrised");
      }
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } else {
      return {
        data: config.data,
        status: 404,
        statusText: "error",
      };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.message);
      throw new Error("Network Error");
    } else if (error instanceof ApiError) {
      console.error("API Request Error:", error.message);
      if (error.message.includes("Not Logged in")) {
        window.location.href = BASE_URL + "/login";
      }
      throw new Error("Not logged in");
    } else {
      console.error("Unknown error:", error);
      throw new Error("Unknown Error");
    }
  }
}

export default apiRequest;

export async function getApiData<T>(url: string): Promise<ApiResponse<T>> {
  return apiRequest<T>("GET", url);
}

// Example function for making a POST request
export async function postApiData<T>(
  url: string,
  requestBody: unknown
): Promise<ApiResponse<T>> {
  return apiRequest<T>("POST", url, requestBody);
}

// Example function for making a PUT request
export async function putApiData<T>(
  url: string,
  requestBody: unknown
): Promise<ApiResponse<T>> {
  return apiRequest<T>("PUT", url, requestBody);
}

// Example function for making a DELETE request
export async function deleteApiData<T>(url: string): Promise<ApiResponse<T>> {
  return apiRequest<T>("DELETE", url);
}
