import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Handles an Axios error.
 *
 * @param {AxiosError} error - The Axios error object.
 * @throws {Error} - Throws an error if there is a response error with a status code of 401, or if there is an error in setting up the request.
 * @returns {void}
 */
export const handleAxiosError = (error: AxiosError) => {
  console.log(error);
  if (error.response) {
    if (error.response.status === 401) {
      console.log("Unauthorized");
      window.location.href = "/login";
    }

    console.log(error.response);
    // Request made and server responded
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
    const err = error.response.data as unknown as {
      statue: string;
      errors: string;
      message: string;
    };
    if (err.errors) {
      throw new Error(err.errors);
    } else if (err.message) {
      throw new Error(err.message);
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error(error.request);

    throw new Error("No response from server, please try again later.");
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error", error.message);

    throw new Error("Something went wrong, please try again later.");
  }
};

/**
 * Formats a date and time string into a localized string representation.
 *
 * @param {string} date - The date and time string to format.
 * @returns {string} The formatted date and time string.
 */
export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString();
};

/**
 * Formats a date string by returning only the date portion.
 *
 * @param {string} date - The date string to be formatted.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date: string) => {
  // return date only
  return formatDateTime(date).replace(/\//g, "-").split(",")[0];
};

export const createSearchQuery = (
  params: Record<
    string,
    string | number | boolean | undefined | string[] | number[]
  >
) => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        query.append(key, v.toString());
      }
    } else if (value !== undefined) {
      query.append(key, value.toString());
    }
  }
  console.log(query.toString());
  return query.toString();
};

export const serializeFormQuery = (
  params: Record<
    string,
    string | number | boolean | undefined | string[] | number[]
  >
) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) return "";
        return `${key}=${value.join(",")}`;
      }
      if (value === undefined || value === "") return "";
      return `${key}=${value}`;
    })
    .filter((val) => val !== "")
    .join("&");
};

export const arrFromQuery = (query: string | null) =>
  !query || query === null || query === ""
    ? []
    : query.split(",").map((val) => parseInt(val));

export const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}