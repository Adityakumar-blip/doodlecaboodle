import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertFirebaseTimestampToDate(timestamp) {
  // Create a Date object from the timestamp (in milliseconds)
  const date = new Date(timestamp);

  // Return formatted date string (e.g., "2025-07-05 11:59:30")
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function getYearFromFirebaseTimestamp(timestamp) {
  if (!timestamp || typeof timestamp.seconds !== "number") {
    throw new Error("Invalid Firebase timestamp");
  }

  const date = new Date(timestamp.seconds * 1000);
  return date.getFullYear();
}

export async function getWorkingBaseUrl(urls: string[]): Promise<string> {
  for (const url of urls) {
    try {
      const res = await axios.get(url + "/health", { timeout: 5000 });
      if (res.status === 200) {
        console.log("✅ Using checkoutBaseUrl:", url);
        return url;
      }
    } catch (err) {
      console.warn("⚠️ Failed URL:", url, err.message);
    }
  }
  throw new Error("No working checkoutBaseUrl found");
}
