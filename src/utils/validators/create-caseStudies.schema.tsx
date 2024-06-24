import { z } from 'zod';
import { fileSchema } from '@/utils/validators/common-rules';

export const caseStudiesFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  publishedBy: z.string().min(1, { message: 'Published by is required' }),
  date: z.date().min(new Date('1900-01-02')).optional(),
});

export type caseStudiesInput = z.infer<typeof caseStudiesFormSchema>;
