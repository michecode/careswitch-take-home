<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Input } from '$lib/components/ui/input';
	import type { Workspace, User, WorkspaceUser } from '@prisma/client';
	import { workspaceFormSchema, type WorkspaceFormSchema } from '../routes/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import Button from './components/ui/button/button.svelte';
	import { UserMinus as UserMinusIcon } from 'lucide-svelte';

	type UserWithWorkspaces = User & {
		workspaces: WorkspaceUser[];
	};

	let {
		validatedForm,
		workspace,
		users,
		buttonText
	}: {
		validatedForm: SuperValidated<Infer<WorkspaceFormSchema>>;
		workspace: Workspace | null;
		users: UserWithWorkspaces[] | null;
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
		invalidateAll: false,
		dataType: 'json'
	});

	const { form: formData, enhance, isTainted, tainted } = form;

	const removeUser = (index: number) => {
		$formData.users = $formData.users.filter((_, i) => i !== index);
	};
	$inspect($formData);
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
	{#if users}
		<Form.Field {form} name="users">
			<Form.Control let:attrs>
				<Form.Label>Users in this Workspace</Form.Label>
				{#each $formData.users as user, index}
					<div class="flex w-64 items-center">
						<span class="inline-flex items-center space-x-2">
							<Avatar.Root>
								<Avatar.Fallback>{`${user.name.at(0)}`}</Avatar.Fallback>
							</Avatar.Root>
							<p>{user.name}</p>
						</span>
						<Button variant="ghost" size="icon" class="ml-auto" on:click={() => removeUser(index)}>
							<UserMinusIcon size="20px" />
						</Button>
					</div>
				{/each}
			</Form.Control>
		</Form.Field>
	{/if}
	<Form.Button class="mt-2 w-full" type="submit" disabled={!isTainted($tainted)}
		>{buttonText}</Form.Button
	>
</form>
