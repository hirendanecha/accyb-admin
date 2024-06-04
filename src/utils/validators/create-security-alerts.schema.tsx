import { z } from 'zod';
import { fileSchema } from '@/utils/validators/common-rules';

export const securityAlertFormSchema = z.object({
  title: z.string().min(1, { message: 'news title is required' }),
  description: z.string().min(1, { message: 'news description is required' }),
 date:z.date().min(new Date('1900-01-01')).optional(),
 Heading: z.array(z.string()).min(1, { message: 'Heading is required' }),
});

export type SecurityAlertInput = z.infer<typeof securityAlertFormSchema>;
