import { z } from 'zod';

export const getMonstersSchema = z.object({
    query: z.object({
        name: z.string().optional(),
        source: z.string().optional(),
        cr: z.string().optional(),
        page: z.string().optional(),
        limit: z.string().optional(),
    }),
});

export const createMonsterSchema = z.object({
    body: z.object({
        name: z.string({ error: 'Jméno monstra je povinné' }).min(2),
        source: z.string({ error: 'Zdroj je povinný (např. MM)' }),
        cr: z.string({ error: 'Challenge Rating (CR) je povinný' }).nullable().optional(),
        type: z.string().nullable().optional(),
        data: z.any().optional(),
    }),
});