<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { User, Workspace } from '@prisma/client';
	import { Button } from '$lib/components/ui/button/index';
	import PencilIcon from 'lucide-svelte/icons/pencil';
	import DeleteIcon from 'lucide-svelte/icons/trash-2';

	let { users, workspaces }: { users: User[]; workspaces: Workspace[] } = $props();
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
				<Table.Cell>test</Table.Cell>
				<Table.Cell>{user.lastLogin ? user.lastLogin.toDateString() : '-'}</Table.Cell>
				<Table.Cell>{user.dateAdded.toDateString()}</Table.Cell>
				<Table.Cell class="flex gap-2">
					<a
						href={`/user/${user.id}/edit`}
						class="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
					>
						<PencilIcon size="20px" />
					</a>
					<Button variant="ghost" size="icon">
						<DeleteIcon size="20px" />
					</Button>
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
