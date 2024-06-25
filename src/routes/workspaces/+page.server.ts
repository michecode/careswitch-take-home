import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteWorkspaceSchema } from '../schema';

export const load = async () => {
	const users = await prisma.user.findMany({ include: { workspaces: true } });
	const workspaces = await prisma.workspace.findMany();
	const deleteWorkspaceForm = await superValidate(zod(deleteWorkspaceSchema));

	return {
		users,
		workspaces,
		deleteWorkspaceForm
	};
};
