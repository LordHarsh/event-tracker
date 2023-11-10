import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2).max(50),
    registerationNumber: z.string().min(12).max(16),
});