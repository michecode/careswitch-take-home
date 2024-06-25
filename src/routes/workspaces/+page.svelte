<script lang="ts">
	import { PackagePlus as PackagePlusIcon } from 'lucide-svelte';
	import WorkspaceTable from '$lib/WorkspaceTable.svelte';

	const { data } = $props();
</script>

<div class="mb-8 mt-2 flex items-center justify-between">
	<div class="">
		<p class="text-4xl">Workspaces</p>
		<p class="text-xs text-gray-400">Manage All Workspaces Here</p>
	</div>
	<div>
		<a
			href="/workspaces/add"
			class="inline-flex items-center justify-center space-x-2 rounded-md border border-input p-2 hover:bg-accent hover:text-accent-foreground"
		>
			<PackagePlusIcon />
			<p>New Workspace</p>
		</a>
	</div>
</div>

<div class="w-full rounded-md border-2">
	<WorkspaceTable
		users={data.users}
		workspaces={data.workspaces}
		deleteWorkspaceForm={data.deleteWorkspaceForm}
	/>
</div>
