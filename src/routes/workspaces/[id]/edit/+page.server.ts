import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { workspaceFormSchema } from '../../../schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const workspace = await prisma.workspace.findUnique({ where: { id: params.id } });

	if (!workspace) {
		error(404, 'Workspace Not Found');
	}

	return {
		workspace,
		workspaceForm: await superValidate(workspace, zod(workspaceFormSchema))
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
			const updatedWorkspace = await prisma.workspace.update({
				where: { id: event.params.id },
				data: {
					name: form.data.name
				}
			});
			console.log(`Updated workspace with id: ${event.params.id}`, updatedWorkspace);
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}

		return {
			form
		};
	}
};
