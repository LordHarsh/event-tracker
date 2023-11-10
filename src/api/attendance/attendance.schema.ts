import { z } from 'zod';

export const attendStartSchema = z.object({
    id: z.string().length(24),
    email: z.string().email()
})