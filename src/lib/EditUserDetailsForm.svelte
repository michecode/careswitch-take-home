<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import type { User } from '@prisma/client';
	import { formSchema, type FormSchema } from '../routes/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let validatedForm: SuperValidated<Infer<FormSchema>>;
	export let user: User | null;

	const form = superForm(validatedForm, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} placeholder={user?.name} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Input {...attrs} placeholder={user?.email} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
</form>
