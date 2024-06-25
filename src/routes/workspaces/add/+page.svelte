<script lang="ts">
	import WorkspaceForm from '$lib/WorkspaceForm.svelte';

	let { data } = $props();
</script>

<div>
	<p class="mt-2 text-4xl">New Workspace</p>
	<p class="mb-8 text-xs text-gray-400">Create a new workspace</p>
	<WorkspaceForm
		validatedForm={data.workspaceForm}
		workspace={null}
		users={null}
		allUsers={null}
		buttonText="Create Workspace"
	/>
</div>
