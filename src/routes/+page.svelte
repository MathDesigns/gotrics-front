<script lang="ts">
    import { metrics, startMetricsPolling } from "../stores/metrics";
    import { onDestroy, onMount } from "svelte";
    
    let pollingHandle: number | null = null;
    
    onMount(() => {
      console.log("Starting metrics polling...");
      pollingHandle = startMetricsPolling();
    });
    
    onDestroy(() => {
      if (pollingHandle !== null) {
        clearInterval(pollingHandle);
      }
    });
  </script>
  
  <main class="bg-gray-100 min-h-screen flex items-center justify-center p-8">
    <div class="bg-white shadow-xl rounded-lg w-full max-w-4xl p-6">
      <h1 class="text-3xl font-bold text-center text-indigo-600 mb-6">Metrics Dashboard</h1>
      
      {#if $metrics.length > 0}
        <ul class="space-y-4">
          {#each $metrics as metric}
            <li class="bg-gray-50 p-4 rounded-lg shadow-md">
              <div class="flex justify-between items-center">
                <span class="text-lg font-semibold text-gray-700">Node: {metric.node_id}</span>
                <div class="text-sm text-gray-500">{metric.cpu.toFixed(2)}% CPU</div>
              </div>
              <div class="text-sm text-gray-500 mt-2">
                Memory: {metric.memory} MB
              </div>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-center text-gray-500">No metrics available</p>
      {/if}
    </div>
  </main>
  