<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { User } from '@prisma/client';
	import { editUserFormSchema, type EditUserFormSchema } from '../routes/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let {
		validatedForm,
		user
	}: { validatedForm: SuperValidated<Infer<EditUserFormSchema>>; user: User } = $props();

	const form = superForm(validatedForm, {
		validators: zodClient(editUserFormSchema)
	});

	const { form: formData, enhance, isTainted, tainted } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} placeholder={user.name} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} placeholder={user.email} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-2 w-full" type="submit" disabled={!isTainted($tainted)}>Update</Form.Button
	>
</form>
