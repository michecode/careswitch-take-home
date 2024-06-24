<script lang="ts">
	import EditUserForm from '$lib/EditUserForm.svelte';

	let { data } = $props();
</script>

<div>
	<EditUserForm validatedForm={data.editUserForm} user={data.user} />
</div>
