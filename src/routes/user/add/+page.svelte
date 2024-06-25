<script lang="ts">
	import EditUserForm from '$lib/EditUserForm.svelte';

	let { data } = $props();
</script>

<div>
	<p class="mt-2 text-4xl">Add User</p>
	<p class="mb-8 text-xs text-gray-400">Add new users</p>
	<EditUserForm validatedForm={data.userForm} user={null} buttonText="Add User" />
</div>
