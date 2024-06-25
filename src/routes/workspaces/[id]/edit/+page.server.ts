import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { workspaceFormSchema } from '../../../schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const workspace = await prisma.workspace.findUnique({ where: { id: params.id } });
	const allUsers = await prisma.user.findMany();
	const users = await prisma.user.findMany({
		where: { workspaces: { some: { workspaceId: params.id } } },
		include: { workspaces: true }
	});

	if (!workspace) {
		error(404, 'Workspace Not Found');
	}

	return {
		workspace,
		users,
		allUsers,
		workspaceForm: await superValidate({ name: workspace.name, users }, zod(workspaceFormSchema))
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

			const usersById = form.data.users.map((user) => user.id);

			await prisma.workspaceUser.deleteMany({
				where: {
					workspaceId: event.params.id,
					userId: {
						notIn: usersById
					}
				}
			});

			await prisma.workspaceUser.deleteMany({
				where: {
					workspaceId: event.params.id,
					userId: {
						in: usersById
					}
				}
			});

			await prisma.workspaceUser.createMany({
				data: usersById.map((userId) => ({
					workspaceId: event.params.id,
					userId: userId
				}))
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}

		return {
			form
		};
	}
};
