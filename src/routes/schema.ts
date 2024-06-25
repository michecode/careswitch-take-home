import { z } from 'zod';

export const userFormSchema = z.object({
	name: z.string().min(1).max(50),
	email: z.string().email()
});

export const deleteUserSchema = z.object({
	id: z.string().cuid()
});

export const workspaceFormSchema = z.object({
	name: z.string().min(1).max(50)
});

export const deleteWorkspaceSchema = z.object({
	id: z.string().cuid()
});

export type UserFormSchema = typeof userFormSchema;
export type DeleteUserSchema = typeof deleteUserSchema;
export type WorkspaceFormSchema = typeof workspaceFormSchema;
export type DeleteWorkspaceSchema = typeof deleteWorkspaceSchema;
