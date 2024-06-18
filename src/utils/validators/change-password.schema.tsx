import { z } from 'zod';

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, { message: 'old password is required' }),
    newPassword: z.string().min(1, { message: 'new password is required' }),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
