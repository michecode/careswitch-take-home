import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { editUserFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const users = await prisma.user.findMany({ include: { workspaces: true } });
	const workspaces = await prisma.workspace.findMany();

	return {
		users,
		workspaces,
		editUserForm: await superValidate(zod(editUserFormSchema))
	};
};

export const actions = {
	default: async (event) => {
		// const formData = await event.request.formData();
		const form = await superValidate(event, zod(editUserFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			// const userId = formData.get('userId');

			const updatedUser = await prisma.user.update({
				where: { email: 'alice_jen@awesome.com' },
				data: {
					name: form.data.name,
					email: form.data.email
				}
			});
			console.log(updatedUser);
		} catch (e) {
			return fail(400, { form });
		}

		return {
			form
		};
	}
};
