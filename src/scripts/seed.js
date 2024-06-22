import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	const workspaces = await prisma.$transaction(async (txn) => {
		await txn.workspaceUser.deleteMany();
		await txn.workspace.deleteMany();
		return await txn.workspace.createManyAndReturn({
			data: [
				{ name: 'general' },
				{ name: 'developers' },
				{ name: 'marketing' },
				{ name: 'designers' }
			]
		});
	});

	console.log(`Created workspaces: ${JSON.stringify(workspaces)}`);

	const users = await prisma.$transaction(async (txn) => {
		await txn.user.deleteMany();
		return await txn.user.createManyAndReturn({
			data: [
				{
					name: 'Alice Jenkins',
					email: 'alice_jen@awesome.com',
					dateAdded: new Date(2023, 2, 15),
					lastLogin: new Date(2024, 5, 17)
				},
				{
					name: 'Bob Piper',
					email: 'bob.piper@test.org',
					dateAdded: new Date(2024, 4, 2),
					lastLogin: new Date(2024, 5, 18)
				}
			]
		});
	});

	console.log(`Created users: ${JSON.stringify(users)}`);

	const workspaceUsers = await prisma.$transaction(async (txn) => {
		// await txn.workspaceUser.deleteMany();

		const allUsers = await txn.user.findMany();
		const generalWorkspace = await txn.workspace.findUnique({ where: { name: 'general' } });

		if (!generalWorkspace || typeof generalWorkspace.id !== 'string') {
			throw new Error('General workspace not found or has invalid id');
		}

		const workspaceUserData = allUsers.map((user) => ({
			userId: user.id,
			workspaceId: generalWorkspace.id
		}));

		return await txn.workspaceUser.createManyAndReturn({
			data: workspaceUserData
		});
	});

	console.log(`Created workspace users: ${JSON.stringify(workspaceUsers)}`);
}

seed().finally(async () => {
	await prisma.$disconnect();
});
