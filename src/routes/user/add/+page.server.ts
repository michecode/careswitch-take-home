import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { userFormSchema } from '../../schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	return {
		userForm: await superValidate(zod(userFormSchema))
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
			const updatedUser = await prisma.user.create({
				data: {
					name: form.data.name,
					email: form.data.email,
					dateAdded: new Date()
				}
			});
			console.log(`Created user with id: ${updatedUser.id}`, updatedUser);
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}

		return {
			form
		};
	}
};
