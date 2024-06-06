import { z } from 'zod';
import { fileSchema } from '@/utils/validators/common-rules';

export const caseStudiesFormSchema = z.object({
  title: z.string().min(1, { message: 'news title is required' }),
  description: z.string().min(1, { message: 'news description is required' }),
  publishedBy: z.boolean().optional(),
  date: z.date().min(new Date('1900-01-02')).optional(),
});

export type caseStudiesInput = z.infer<typeof caseStudiesFormSchema>;
