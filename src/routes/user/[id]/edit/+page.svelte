<script lang="ts">
	import EditUserForm from '$lib/EditUserForm.svelte';

	let { data } = $props();
</script>

<div>
	<p class="text-4xl font-bold">Edit User</p>
	<EditUserForm validatedForm={data.userForm} user={data.user} buttonText="Update User" />
</div>
