<script>
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	import MoonIcon from 'lucide-svelte/icons/moon';
	import SunIcon from 'lucide-svelte/icons/sun';

	let { children } = $props();
</script>

<ModeWatcher />

<div>
	<!-- header -->
	<div class="flex h-16 items-center justify-between">
		<p class="px-8 py-6 text-4xl">🙀🤭🤥😁</p>
		<div class="mr-4">
			<Button variant="ghost" size="icon" on:click={toggleMode}>
				{#if $mode === 'light'}
					<MoonIcon />
				{:else}
					<SunIcon />
				{/if}
			</Button>
		</div>
	</div>
	<!-- body -->
	<div class="flex">
		<div class="h-screen w-1/6">sidebar</div>
		<div class="w-5/6 rounded-xl border-l-2 border-t-2 p-4">{@render children()}</div>
	</div>
</div>
