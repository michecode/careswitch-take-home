import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { workspaceFormSchema } from '../../schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	return {
		workspaceForm: await superValidate(zod(workspaceFormSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(workspaceFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const newWorkspace = await prisma.workspace.create({
				data: {
					name: form.data.name
				}
			});
			console.log(`Created workspace with id: ${newWorkspace.id}`, newWorkspace);
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}

		return {
			form
		};
	}
};
