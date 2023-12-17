import z from 'zod';

export const rsvpSchema = z.object({
    id: z.string().length(24),
});