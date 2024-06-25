import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { deleteUserSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const users = await prisma.user.findMany({ include: { workspaces: true } });
	const workspaces = await prisma.workspace.findMany();
	const deleteUserForm = await superValidate(zod(deleteUserSchema));

	return {
		users,
		workspaces,
		deleteUserForm
	};
};

export const actions = {
	deleteUser: async (event) => {
		const form = await superValidate(event, zod(deleteUserSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const updatedUser = await prisma.user.delete({ where: { id: form.data.id } });
			console.log(`Deleted user with id: ${form.data.id}`, updatedUser);
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}

		return {
			form
		};
	}
};
