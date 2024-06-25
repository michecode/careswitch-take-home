<script lang="ts">
	import { Trash2 as DeleteIcon } from 'lucide-svelte';
	import Button from './components/ui/button/button.svelte';
	import * as Dialog from './components/ui/dialog';
	import * as Form from './components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { deleteUserSchema, type DeleteWorkspaceSchema } from '../routes/schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from './components/ui/input/';

	let {
		workspaceId,
		deleteWorkspaceForm
	}: { workspaceId: string; deleteWorkspaceForm: SuperValidated<Infer<DeleteWorkspaceSchema>> } =
		$props();

	const form = superForm(deleteWorkspaceForm, {
		validators: zodClient(deleteUserSchema)
	});

	const { form: formData, enhance } = form;

	$formData.id = workspaceId;
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button variant="ghost" size="icon">
			<DeleteIcon size="20px" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<p>Are you sure?</p>
		<form method="POST" action="?/deleteWorkspace" use:enhance>
			<Form.Field {form} name="id" class="hidden">
				<Form.Control let:attrs>
					<Input {...attrs} placeholder="user id" bind:value={$formData.id} />
				</Form.Control>
			</Form.Field>
			<Form.Button type="submit" variant="destructive">Delete Workspace</Form.Button>
		</form>
	</Dialog.Content>
</Dialog.Root>
