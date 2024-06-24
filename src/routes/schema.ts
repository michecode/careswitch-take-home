import { z } from 'zod';

export const editUserFormSchema = z.object({
	name: z.string().min(1).max(50),
	email: z.string().email()
});

export type EditUserFormSchema = typeof editUserFormSchema;
