import { Document } from "mongoose";

export interface FetchData<T> {
  success: boolean;
  data: T extends never[]
    ? Omit<T[number], keyof Document>
    : Omit<T, keyof Document>;
}
export async function fetchData<T>(url: string): Promise<FetchData<T>> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: FetchData<T> = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
