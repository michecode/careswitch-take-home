<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { User, Workspace } from '@prisma/client';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import PencilIcon from 'lucide-svelte/icons/pencil';
	import DeleteIcon from 'lucide-svelte/icons/trash-2';
	import EditUserDetailsForm from './EditUserDetailsForm.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from '../routes/schema';

	export let users: User[];
	export let workspaces: Workspace[];
	export let form: SuperValidated<Infer<FormSchema>>;

	let editingUser: User | null;
</script>

<Dialog.Root>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Name</Table.Head>
				<Table.Head>Workspaces</Table.Head>
				<Table.Head>Last Login</Table.Head>
				<Table.Head>Date Added</Table.Head>
				<Table.Head />
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each users as user (user.id)}
				<Table.Row>
					<Table.Cell class="flex flex-row items-center gap-2 font-medium">
						<Avatar.Root class="text-nano h-6 w-6">
							<!-- <Avatar.Image src="" alt={user.name} /> -->
							<Avatar.Fallback>{`${user.name.at(0)}`}</Avatar.Fallback>
						</Avatar.Root>
						<div>
							{user.name}
							<div class="text-nano">
								{user.email}
							</div>
						</div>
					</Table.Cell>
					<Table.Cell>test</Table.Cell>
					<Table.Cell>{user.lastLogin ? user.lastLogin.toDateString() : '-'}</Table.Cell>
					<Table.Cell>{user.dateAdded.toDateString()}</Table.Cell>
					<Table.Cell class="flex gap-2">
						<Dialog.Trigger
							class={buttonVariants({ variant: 'ghost' })}
							on:click={() => (editingUser = user)}
						>
							<PencilIcon size="20px" />
						</Dialog.Trigger>
						<Button variant="ghost" size="icon">
							<DeleteIcon size="20px" />
						</Button>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
	<Dialog.Content>
		<Dialog.Header>Edit User</Dialog.Header>
		<EditUserDetailsForm validatedForm={form} user={editingUser} />
	</Dialog.Content>
</Dialog.Root>
