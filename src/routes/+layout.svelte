<script>
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	import MoonIcon from 'lucide-svelte/icons/moon';
	import SunIcon from 'lucide-svelte/icons/sun';
	import UserIcon from 'lucide-svelte/icons/user-round';
	import WorkspaceIcon from 'lucide-svelte/icons/component';

	let { children } = $props();

	const sidebarLinks = [
		{
			route: '/',
			title: 'Users',
			icon: UserIcon
		},
		{
			route: '/workspaces',
			title: 'Workspaces',
			icon: WorkspaceIcon
		}
	];
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
		<div class="ml-8 mt-8 flex h-screen w-1/6 flex-col space-y-4">
			{#each sidebarLinks as link}
				<a href={link.route} class="flex items-center space-x-4">
					<svelte:component this={link.icon} />
					<p class="text-xl">{link.title}</p>
				</a>
			{/each}
		</div>
		<div class="w-5/6 rounded-xl border-l-2 border-t-2 p-4">{@render children()}</div>
	</div>
</div>
