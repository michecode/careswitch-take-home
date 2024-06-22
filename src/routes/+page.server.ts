import { prisma } from '$lib/server/db';

export const load = async () => {
	const users = await prisma.user.findMany({ include: { workspaces: true } });
	const workspaces = await prisma.workspace.findMany();

	return { users, workspaces };
};
