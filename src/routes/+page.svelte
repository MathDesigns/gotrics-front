<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
  import { Activity, Cpu, MemoryStick, MemoryStickIcon } from 'lucide-svelte';
	import { metrics, startMetricsPolling } from '../stores/metrics';
	import { onDestroy, onMount } from 'svelte';

	let pollingHandle: number | null = null;

	onMount(() => {
		console.log('Starting metrics polling...');
		pollingHandle = startMetricsPolling();
	});

	onDestroy(() => {
		if (pollingHandle !== null) {
			clearInterval(pollingHandle);
		}
	});

  function convertSeconds(seconds: number) {
    let days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    let hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    let mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;

    return { days, hrs, mnts, seconds };
}
</script>

<div
	class="mx-auto my-auto flex min-h-screen max-w-96 flex-col flex-wrap space-y-4 sm:max-w-screen-md"
>
	{#each $metrics as metric}
  <Card.Root class="hover:scale-110">
    <Card.Header>
      <Card.Title>{metric.node_id}: {metric.cpu_model} </Card.Title>
      <div class="flex flew-row justify-between p-1">
      <Card.Root class="p-4 mt-5 hover:scale-110">
        <Cpu />
        Load: {(metric.cpu *1).toFixed(2)}%
      </Card.Root>
      <Card.Root class="p-4 mt-5 hover:scale-110">
        <MemoryStick />
        {(metric.used_memory / Math.pow(1024, 3)).toFixed(2)} GiB / {(metric.total_memory / Math.pow(1024, 3)).toFixed(2)} GiB
      </Card.Root>
      <Card.Root class="p-4 mt-5 hover:scale-110">
        <Activity />
        {convertSeconds(metric.uptime).days} days {convertSeconds(metric.uptime).hrs} hours {convertSeconds(metric.uptime).mnts} minutes
      </Card.Root>
    </div>
      <Card.Description>
        Platform: {metric.platform} <br />
        Used Storage: {(metric.used_space / Math.pow(1024, 3)).toFixed(0)} GiB / {(metric.total_space / Math.pow(1024, 3)).toFixed(0)} GiB
      </Card.Description>
    </Card.Header>
    <Card.Content></Card.Content>
  </Card.Root>
  
	{/each}
</div>
