import { writable } from "svelte/store";

export interface Metric {
  node_id: string;
  cpu: number;
  cpu_model: string;
  used_memory: number;
  total_memory: number;
  uptime: number;
  platform: string;
  used_space: number;
  total_space: number;
}


export const metrics = writable<Metric[]>([]);

export async function fetchMetrics(): Promise<void> {
  try {
    console.log("Fetching metrics...");
    const res = await fetch("http://localhost:8080/metrics");
    if (!res.ok) {
      throw new Error(`Failed to fetch metrics: ${res.status}`);
    }
    const data: Metric[] = await res.json();
    console.log("Received data:", data);
    metrics.set(data);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    metrics.set([]);
  }
}

export function startMetricsPolling(interval = 5000): number {
  fetchMetrics();
  return window.setInterval(fetchMetrics, interval);
}
