import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

export const newsFormSchema = z.object({
  title: z.string().min(1, { message: 'Event name is required' }),
  description: z.string().min(1, { message: 'Event description is required' }),
  targetAudience: z.string().min(1, { message: 'required' }),
  source: z.string().min(1, { message: 'required' }),
  isPublished: z.boolean().optional(),
  rate: z.string().min(1, { message: 'required' }),
  // eventImages: z.array(fileSchema).min(1, { message: 'required' }),
  publishedDate: z.date().min(new Date('1900-01-01')).optional(),
  endDate: z.date().min(new Date('1900-01-02')).optional(),
});

export type NewsEventInput = z.infer<typeof newsFormSchema>;
