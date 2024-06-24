import { z } from 'zod';

export const userFormSchema = z.object({
	name: z.string().min(1).max(50),
	email: z.string().email()
});

export type UserFormSchema = typeof userFormSchema;
