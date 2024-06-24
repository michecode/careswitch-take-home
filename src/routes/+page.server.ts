import { prisma } from '$lib/server/db';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const users = await prisma.user.findMany({ include: { workspaces: true } });
	const workspaces = await prisma.workspace.findMany();

	return {
		users,
		workspaces,
		form: await superValidate(zod(formSchema))
	};
};
