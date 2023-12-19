import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    domain: z.string().min(3).max(255),
    position: z.string().min(3).max(255),
    password: z.string().min(6).max(255),
    phone: z.string().min(3).max(255),
});

export const loginSchema = z.object({
    email: z.string().min(3).max(255),
    password: z.string().min(6).max(255),
});

export type SignupUser = z.infer<typeof signupSchema>;
export type LoginUser = z.infer<typeof loginSchema>;