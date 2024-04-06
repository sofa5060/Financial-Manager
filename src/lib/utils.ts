import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { redirect } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === 401) {
      console.error("Unauthorized");
      redirect("/login");
      return;
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

export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString();
};
