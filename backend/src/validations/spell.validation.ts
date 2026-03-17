import { z, ZodObject } from 'zod';

export const createSpellSchema = z.object({
    body: z.object({
        name: z.string({ error: 'Jméno kouzla je povinné' }).min(2),
        source: z.string({ error: 'Zdroj je povinný (např. PHB)' }),
        level: z.number().int().min(0).max(9),
        school: z.string().optional(),
        data: z.any().optional()
    })
});

export const getSpellsSchema = z.object({
    query: z.object({
        name: z.string().optional(),
        level: z.string().optional(),
        page: z.string().optional(),
        limit: z.string().optional(),
    })
});