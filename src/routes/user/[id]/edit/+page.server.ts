import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { userFormSchema } from '../../../schema';
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
		userForm: await superValidate(user, zod(userFormSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(userFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const updatedUser = await prisma.user.update({
				where: { id: event.params.id },
				data: {
					name: form.data.name,
					email: form.data.email
				}
			});
			console.log(`Updated user with id: ${event.params.id}`, updatedUser);
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}

		return {
			form
		};
	}
};
