<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { User, Workspace, WorkspaceUser } from '@prisma/client';
	import PencilIcon from 'lucide-svelte/icons/pencil';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type DeleteUserSchema } from '../routes/schema';
	import DeleteUserDialog from './DeleteUserDialog.svelte';
	import Badge from './components/ui/badge/badge.svelte';

	type UserWithWorkspaces = User & {
		workspaces: WorkspaceUser[];
	};

	let {
		users,
		workspaces,
		deleteUserForm
	}: {
		users: UserWithWorkspaces[];
		workspaces: Workspace[];
		deleteUserForm: SuperValidated<Infer<DeleteUserSchema>>;
	} = $props();
</script>

<Table.Root class="w-full">
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
					<Avatar.Root class="h-6 w-6 text-nano">
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
				<Table.Cell class="">
					<div class="flex max-w-60 flex-wrap space-x-2 space-y-1">
						{#each user.workspaces as workspace}
							<Badge
								>{workspaces.find((namedWorkspace) => namedWorkspace.id === workspace.workspaceId)
									?.name}</Badge
							>
						{/each}
					</div>
				</Table.Cell>
				<Table.Cell>{user.lastLogin ? user.lastLogin.toDateString() : '-'}</Table.Cell>
				<Table.Cell>{user.dateAdded.toDateString()}</Table.Cell>
				<Table.Cell class="flex gap-2">
					<a
						href={`/user/${user.id}/edit`}
						class="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
					>
						<PencilIcon size="20px" />
					</a>
					<DeleteUserDialog userId={user.id} {deleteUserForm} />
				</Table.Cell>
			</Table.Row>
		{/each}
		{#if users.length === 0}
			<Table.Row>
				<Table.Cell>No Users</Table.Cell>
			</Table.Row>
		{/if}
	</Table.Body>
</Table.Root>
