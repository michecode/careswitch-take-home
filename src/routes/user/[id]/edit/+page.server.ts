import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { editUserFormSchema } from '../../../schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const user = await prisma.user.findUnique({
		where: { id: params.id },
		include: { workspaces: true }
	});

	if (!user) {
		error(404, 'User Not Found');
	}

	return {
		user,
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
