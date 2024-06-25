<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { User, Workspace, WorkspaceUser } from '@prisma/client';
	import PencilIcon from 'lucide-svelte/icons/pencil';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { type DeleteWorkspaceSchema } from '../routes/schema';
	import DeleteWorkspaceDialog from './DeleteWorkspaceDialog.svelte';

	type UserWithWorkspaces = User & {
		workspaces: WorkspaceUser[];
	};

	let {
		users,
		workspaces,
		deleteWorkspaceForm
	}: {
		users: UserWithWorkspaces[];
		workspaces: Workspace[];
		deleteWorkspaceForm: SuperValidated<Infer<DeleteWorkspaceSchema>>;
	} = $props();
</script>

<Table.Root class="w-full">
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
			<Table.Head>Users</Table.Head>
			<Table.Head />
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each workspaces as workspace}
			<Table.Row>
				<Table.Cell class="flex flex-row items-center gap-2 font-medium">
					<p>{workspace.name}</p>
				</Table.Cell>
				<Table.Cell class="">
					<div class="flex max-w-60 items-center -space-x-2">
						{#each users as user}
							{#if user.workspaces.some((userWorkspace) => userWorkspace.workspaceId === workspace.id)}
								<Avatar.Root class="h-10 w-10 text-sm ring-2 ring-white">
									<!-- <Avatar.Image src="" alt={user.name} /> -->
									<Avatar.Fallback>{`${user.name.at(0)}`}</Avatar.Fallback>
								</Avatar.Root>
							{/if}
						{/each}
					</div>
				</Table.Cell>
				<Table.Cell class="flex gap-2">
					<a
						href={`/user/${workspace.id}/edit`}
						class="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
					>
						<PencilIcon size="20px" />
					</a>
					<DeleteWorkspaceDialog workspaceId={workspace.id} {deleteWorkspaceForm} />
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
