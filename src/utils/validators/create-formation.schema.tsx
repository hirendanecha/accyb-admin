import { z } from 'zod';
import { fileSchema } from '@/utils/validators/common-rules';

export const formationSchema = z.object({
  title: z.string().min(1, { message: 'news title is required' }),
  description: z.string().min(1, { message: 'news description is required' }),
  heading: z.array(z.string()).min(1, { message: 'Heading is required' }),
  cost: z.number().int().min(1, { message: 'Cost is required' }),
  duration: z.string().min(1, { message: 'Duration is required' }),
  domain: z.string().min(1, { message: 'Domain is required' }),
  typeOfFormation: z.string().min(1, { message: 'Type of Formation is required' }),
  territory: z.string().min(1, { message: 'Territory is required' }),
  trainingSite: z.string().min(1, { message: 'Training Site is required' }),
  targetedLevel: z.string().min(1, { message: 'Targeted Level is required' }),
  titleObtained: z.string().min(1, { message: 'Title Obtained is required' }),
  financingSolution: z.string().min(1, { message: 'Financing Solution is required' }),
  targetedProfessions: z.array(z.string()).min(1, { message: 'Targeted Professions is required' }),
});

export type FormationInput = z.infer<typeof formationSchema>;
