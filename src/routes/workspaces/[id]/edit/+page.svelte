<script lang="ts">
	import WorkspaceForm from '$lib/WorkspaceForm.svelte';

	let { data } = $props();
</script>

<div>
	<p class="mt-2 text-4xl">Edit Workspace</p>
	<p class="mb-8 text-xs text-gray-400">Editing this workspace</p>
	<WorkspaceForm
		validatedForm={data.workspaceForm}
		workspace={data.workspace}
		users={data.users}
		allUsers={data.allUsers}
		buttonText="Update Workspace"
	/>
</div>
