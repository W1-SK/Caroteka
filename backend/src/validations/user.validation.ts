import { z } from 'zod';
import { Role } from '@prisma/client';

export const updateUserRoleSchema = z.object({
    body: z.object({
        role: z.nativeEnum(Role, {
            message: 'Role musí být USER, HOMEBREW nebo ADMIN'
        })
    })
});