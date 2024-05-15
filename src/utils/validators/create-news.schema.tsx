import { z } from 'zod';
import { fileSchema } from '@/utils/validators/common-rules';

export const newsFormSchema = z.object({
  title: z.string().min(1, { message: 'news title is required' }),
  description: z.string().min(1, { message: 'news description is required' }),
  targetAudience: z.string().min(1, { message: 'Tergeted audience required' }),
  source: z.string().min(1, { message: 'Source required' }),
  isPublished: z.boolean().optional(),
  rate: z.number().int().min(1, { message: 'rate should be minimum 1' }).max(5, { message: 'rate should be maximum 5' }),
  // eventImages: z.array(fileSchema).min(1, { message: 'required' }),
  publishedDate: z.date().min(new Date('1900-01-01')).optional(),
  endDate: z.date().min(new Date('1900-01-02')).optional(),
});

export type NewsEventInput = z.infer<typeof newsFormSchema>;
