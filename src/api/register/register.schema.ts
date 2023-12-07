import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2).max(100),
    mobile: z.string().min(10),
    branch: z.string().min(2).max(50),
    registrationNumber: z.string().min(12),
});