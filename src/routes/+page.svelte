<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/';
	import UserTable from '$lib/UserTable.svelte';
	import type { Selected } from 'bits-ui';
	import { Eraser as EraserIcon, UserPlus as AddUserIcon } from 'lucide-svelte';

	let { data } = $props();

	let searchValue = $state('');
	let workspaceFilter = $state(undefined) as Selected<string> | undefined;
	let workspaceIdFilter = $derived(workspaceFilter?.value);
	let filteredUsers = $derived.by(() => {
		if (!searchValue && !workspaceIdFilter) {
			return data.users;
		}

		return data.users.filter((user) => {
			// name filtering
			if (searchValue && !user.name.toLowerCase().includes(searchValue.toLowerCase())) {
				return false;
			}

			// workspace filtering
			if (
				workspaceIdFilter &&
				!user.workspaces.some(({ workspaceId }) => workspaceId === workspaceIdFilter)
			) {
				return false;
			}

			return true;
		});
	});

	const cardData = [
		{
			title: 'Total Users',
			value: data.users.length
		},
		{
			title: 'Active Users',
			value: 48
		},
		{
			title: 'Open Tickets',
			value: 28
		},
		{
			title: 'Pending Invites',
			value: 4
		}
	];
</script>

<div class="">
	<!-- header -->
	<div class="mb-8 mt-2 flex items-center justify-between">
		<div class="">
			<p class="text-4xl">Users</p>
			<p class="text-xs text-gray-400">Manage All Users Here</p>
		</div>
		<div>
			<a
				href="/user/add"
				class="inline-flex items-center justify-center space-x-2 rounded-md border border-input p-2 hover:bg-accent hover:text-accent-foreground"
			>
				<AddUserIcon />
				<p>Add User</p>
			</a>
		</div>
	</div>
	<!-- cards -->
	<div class="my-4 flex justify-around space-x-4">
		{#each cardData as singleCard}
			<Card.Root class="flex-grow">
				<Card.Header>
					<Card.Title>{singleCard.title}</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="text-2xl font-bold">{singleCard.value}</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
	<!-- filters -->
	<div class="mb-3 mt-8 flex justify-end space-x-2">
		{#if searchValue || workspaceIdFilter}
			<Button
				on:click={() => {
					searchValue = '';
					workspaceFilter = undefined;
				}}
				class="space-x-2"
			>
				<EraserIcon />
				<p>Clear Filters</p>
			</Button>
		{/if}
		<Select.Root bind:selected={workspaceFilter}>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Filter by Workspace" />
			</Select.Trigger>
			<Select.Content>
				{#each data.workspaces as workspace}
					<Select.Item value={workspace.id}>{workspace.name}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<Input placeholder="Filter by Name" bind:value={searchValue} class="w-60" />
	</div>
	<div class="w-full rounded-md border-2">
		<UserTable
			users={filteredUsers}
			workspaces={data.workspaces}
			deleteUserForm={data.deleteUserForm}
		/>
	</div>
</div>
