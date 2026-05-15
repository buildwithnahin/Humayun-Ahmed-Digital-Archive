import { z } from 'zod';

export const getWorksQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(val => (val ? parseInt(val, 10) : 1)),
    limit: z.string().optional().transform(val => (val ? parseInt(val, 10) : 10)),
    search: z.string().optional(),
    category: z.enum(['NOVEL', 'NATOK', 'MOVIE', 'SCIENCE_FICTION', 'MEMOIR', 'SHORT_STORY']).optional(),
    year: z.string().optional().transform(val => (val ? parseInt(val, 10) : undefined)),
  })
});

export type GetWorksQuery = z.infer<typeof getWorksQuerySchema>['query'];
