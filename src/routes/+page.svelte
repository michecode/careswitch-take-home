<script lang="ts">
	import UserTable from '$lib/UserTable.svelte';

	let { data } = $props();
</script>

<div class="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
	<div class="space-y-6 rounded-md p-4 dark:border">
		<UserTable users={data.users} workspaces={data.workspaces} form={data.form} />
	</div>
</div>
