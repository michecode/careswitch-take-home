<script lang="ts">
	import EditUserForm from '$lib/EditUserForm.svelte';

	let { data } = $props();
</script>

<div>
	<p class="mt-2 text-4xl">Edit User</p>
	<p class="mb-8 text-xs text-gray-400">Editing this user</p>
	<EditUserForm validatedForm={data.userForm} user={data.user} buttonText="Update User" />
</div>
