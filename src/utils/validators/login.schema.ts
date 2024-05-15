import { z } from 'zod';

// form zod validation schema
export const loginSchema = z.object({
  email: z.string().min(1,{message:'This field has to be filled.'}).email('this is not a valid email'),
  password: z.string().min(6,{message:'Password must be at least 6 characters long.'}),
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
