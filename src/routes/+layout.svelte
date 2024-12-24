<script lang="ts">
	import { writable } from 'svelte/store';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	let { children } = $props();

	const isMobileMenuOpen = writable(false);

	const toggleMobileMenu = () => {
		isMobileMenuOpen.update((value) => !value);
	};
</script>

<ModeWatcher />
<nav class="bg-catpuccin_base font-tech">
	<div class="mx-auto px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded={$isMobileMenuOpen ? 'true' : 'false'}
					onclick={toggleMobileMenu}
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>

					<!-- Icon when menu is closed -->
					<svg
						class="{$isMobileMenuOpen ? 'hidden' : 'block'} block size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
						data-slot="icon"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>

					<!-- Icon when menu is open -->
					<svg
						class="{$isMobileMenuOpen ? 'block' : 'hidden'} size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</button>
				<Button on:click={toggleMode} variant="outline" size="icon">
					<Sun
					  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
					  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				  </Button>
			</div>

			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex shrink-0 items-center">
					<a href="/">
					<img class="h-8 w-auto" src="favicon.png" alt="MathDesigns" />
				</a>
				</div>

				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<a
							href="nodes"
							class="text-catpuccin_text hover:bg-catpuccin_mauve hover:text-catpuccin_base rounded-md px-3 py-2 text-sm font-medium"
							>Nodes</a
						>
						<a
							href="WIP"
							class="text-catpuccin_text hover:bg-catpuccin_mauve hover:text-catpuccin_base rounded-md px-3 py-2 text-sm font-medium"
							>WIP</a
						>
						<Button on:click={toggleMode} variant="outline" size="icon">
							<Sun
							  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
							/>
							<Moon
							  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
							/>
							<span class="sr-only">Toggle theme</span>
						  </Button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	<div class={$isMobileMenuOpen ? 'block sm:hidden' : 'hidden sm:hidden'} id="mobile-menu">
		<div class="space-y-1 px-2 pb-3 pt-2">
			<a
				href="nodes"
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>All nodes</a
			>
			<a
				href="WIP"
				class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
				>WIP</a
			>
		</div>
	</div>
</nav>

{@render children()}