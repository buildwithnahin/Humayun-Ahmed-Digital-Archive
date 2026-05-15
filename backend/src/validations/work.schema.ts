import { z } from 'zod';

// Schema for fetching works with pagination, search, and filters
export const getWorksSchema = z.object({
  query: z.object({
    page: z.string().optional().default('1'),
    limit: z.string().optional().default('10'),
    search: z.string().optional(),
    category: z.enum(['NOVEL', 'NATOK', 'MOVIE', 'SCIENCE_FICTION', 'MEMOIR', 'SHORT_STORY']).optional(),
    year: z.string().optional(),
  }),
});

// Used to type inference in Controller
export type GetWorksQuery = z.infer<typeof getWorksSchema>['query'];
