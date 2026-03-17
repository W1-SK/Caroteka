import { z } from 'zod';

export const createClassSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        source: z.string(),
        data: z.any().optional(),
    }),
});