<script lang="ts">
	import EditUserForm from '$lib/EditUserForm.svelte';

	let { data } = $props();
</script>

<div>
	<p class="text-4xl font-bold">Add User</p>
	<EditUserForm validatedForm={data.userForm} user={null} buttonText="Add User" />
</div>
