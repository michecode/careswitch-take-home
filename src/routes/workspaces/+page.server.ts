import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { deleteWorkspaceSchema } from '../schema';
import { fail } from '@sveltejs/kit';

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

export const actions = {
	deleteWorkspace: async (event) => {
		const form = await superValidate(event, zod(deleteWorkspaceSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await prisma.workspaceUser.deleteMany({
				where: { workspaceId: form.data.id }
			});
			const updatedWorkspace = await prisma.workspace.delete({ where: { id: form.data.id } });
			console.log(`Deleted workspace with id: ${form.data.id}`, updatedWorkspace);
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}

		return {
			form
		};
	}
};
