import { writable } from "svelte/store";

// Define the structure of a metric according to the API response
export interface Metric {
  node_id: string;
  cpu: number;
  memory: number;
}

// Writable store to hold metrics data
export const metrics = writable<Metric[]>([]);

// Function to fetch metrics from the server
export async function fetchMetrics(): Promise<void> {
  try {
    console.log("Fetching metrics...");
    const res = await fetch("http://localhost:8080/metrics");
    if (!res.ok) {
      throw new Error(`Failed to fetch metrics: ${res.status}`);
    }
    const data: Metric[] = await res.json();
    console.log("Received data:", data); // Log the received data
    metrics.set(data); // Update the store with fetched data
  } catch (error) {
    console.error("Error fetching metrics:", error);
    metrics.set([]); // Clear the store on error
  }
}

// Function to periodically update the metrics
export function startMetricsPolling(interval = 5000): number {
  fetchMetrics(); // Initial fetch
  return window.setInterval(fetchMetrics, interval); // Fetch every `interval` ms
}
