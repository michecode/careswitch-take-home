<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Input } from '$lib/components/ui/input';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Workspace, User, WorkspaceUser } from '@prisma/client';
	import { workspaceFormSchema, type WorkspaceFormSchema } from '../routes/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { UserMinus as UserMinusIcon } from 'lucide-svelte';
	import { tick } from 'svelte';

	type UserWithWorkspaces = User & {
		workspaces: WorkspaceUser[];
	};

	let {
		validatedForm,
		workspace,
		users,
		allUsers,
		buttonText
	}: {
		validatedForm: SuperValidated<Infer<WorkspaceFormSchema>>;
		workspace: Workspace | null;
		users: UserWithWorkspaces[] | null;
		allUsers: User[] | null;
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

	let open = $state(false);

	const removeUser = (index: number) => {
		$formData.users = $formData.users.filter((_, i) => i !== index);
	};

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
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
	{#if users && allUsers}
		<Form.Field {form} name="users">
			<Form.Control let:attrs>
				<Form.Label>Users in this Workspace</Form.Label>
				<div class="flex items-center space-x-4">
					<Popover.Root bind:open let:ids>
						<Popover.Trigger asChild let:builder>
							<Button builders={[builder]} variant="outline" class="w-fit justify-start">
								Add Users
							</Button>
						</Popover.Trigger>
						<Popover.Content class="p-0" align="start" side="right">
							<Command.Root>
								<Command.Input placeholder="Search users..." />
								<Command.List>
									<Command.Empty>No results found.</Command.Empty>
									<Command.Group>
										{#each allUsers as user}
											<Command.Item
												value={user.name}
												onSelect={(currentValue) => {
													if (!$formData.users.some((formUser) => formUser.id === user.id)) {
														$formData.users = [...$formData.users, user];
													}
													closeAndFocusTrigger(ids.trigger);
												}}
											>
												{user.name}
											</Command.Item>
										{/each}
									</Command.Group>
								</Command.List>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
				</div>
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
