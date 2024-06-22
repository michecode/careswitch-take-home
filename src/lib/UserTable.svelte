<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Avatar from '$lib/components/ui/avatar';
	import type { User, Workspace } from '@prisma/client';

	export let users: User[];
	export let workspaces: Workspace[];
	console.log(users, workspaces);
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
			<Table.Head>Workspaces</Table.Head>
			<Table.Head>Last Login</Table.Head>
			<Table.Head>Date Added</Table.Head>
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
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
