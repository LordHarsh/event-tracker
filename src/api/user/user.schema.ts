import z from 'zod';

export const verifyUserSchema = z.object({
  id: z.string().length(24),
});