import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema } from '@/utils/validators/common-rules';

export const eventFormSchema = z.object({
  title: z.string().min(1, { message: 'Event name is required' }),
  description: z.string().min(1, { message: 'Event description is required' }),
  targetAudience: z.string().min(1, { message: 'required' }),
  speakers: z.string().min(1, { message: 'required' }),
  registerLink: z.string().min(1, { message: 'required' }),
  access: z.string().min(1, { message: 'required' }),
  // pictureLink: z
  //   .instanceof(FileList)
  //   .refine((data) => data && data.length > 0, {
  //     message: 'Document is required',
  //   }),
  startDate: z.date().min(new Date('1900-01-01')).optional(),
  endDate: z.date().min(new Date('1900-01-02')).optional(),
  eventType: z.string().min(1, { message: 'Select event type' }),
  isFeatured: z.boolean().optional(),
  // otherDocument: z
  //   .instanceof(FileList)
  //   .refine((data) => data && data.length > 0, {
  //     message: 'Document is required',
  //   }),
});

export type CreateEventInput = z.infer<typeof eventFormSchema>;
