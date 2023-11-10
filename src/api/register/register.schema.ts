import { z } from 'zod';

export const reisterSchema = z.object({
    id: z.string().length(24),
    email: z.string().email(),
    name: z.string().min(2).max(50),
});