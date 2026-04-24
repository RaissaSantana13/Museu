import z from 'zod';

export const UsuarioSchema = z.object({
  idUsuario: z.number(),
  username: z
    .string()
    .min(5, 'Bug title must be at least 5 characters.')
    .max(32, 'Bug title must be at most 32 characters.'),
  email: z
    .string()
    .min(20, 'Description must be at least 20 characters.')
    .max(100, 'Description must be at most 100 characters.')
    .email(' email invalido'),
});

export type UsuarioCreate = z.infer<typeof UsuarioSchema>;

export type UsuarioUpdate = z.infer<typeof UsuarioSchema>;

export type UsuarioResponse = z.infer<typeof UsuarioSchema>;
