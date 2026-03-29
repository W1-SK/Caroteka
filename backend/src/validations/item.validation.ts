import { z } from 'zod';

export const getItemsSchema = z.object({
    query: z.object({
        name: z.string().optional(),
        source: z.string().optional(),
        type: z.string().optional(),
        page: z.string().optional(),
        limit: z.string().optional(),
    }),
});

export const createItemSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        source: z.string(),
        type: z.string().nullable().optional(),
        rarity: z.string().nullable().optional(),
        data: z.any().optional(),
    }),
});