<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { Workspace } from '@prisma/client';
	import { workspaceFormSchema, type WorkspaceFormSchema } from '../routes/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	let {
		validatedForm,
		workspace,
		buttonText
	}: {
		validatedForm: SuperValidated<Infer<WorkspaceFormSchema>>;
		workspace: Workspace | null;
		buttonText: string;
	} = $props();

	const form = superForm(validatedForm, {
		validators: zodClient(workspaceFormSchema),
		onResult: (event) => {
			if (event.result.status === 200) {
				toast('Success!');
			} else if (event.result.status === 400) {
				toast('Action Failed');
			} else {
				toast('Unknown Error');
			}
		},
		resetForm: false,
		invalidateAll: false
	});

	const { form: formData, enhance, isTainted, tainted } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} placeholder={workspace?.name || 'Team'} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-2 w-full" type="submit" disabled={!isTainted($tainted)}
		>{buttonText}</Form.Button
	>
</form>
