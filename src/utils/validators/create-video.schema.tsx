import { z } from 'zod';
import { fileSchema } from '@/utils/validators/common-rules';

export const videoFormSchema = z.object({
  name: z.string().min(1, { message: 'name title is required' }),
  link: z.string().min(1, { message: 'link is required' }),
});

export type VideoInput = z.infer<typeof videoFormSchema>;
