import z from "zod";

export const schema = z.object({
  content: z
    .string()
    .trim()
    .nonempty("El contenido del logro es obligatorio")
    .max(1000, "Máximo 1000 caracteres"),
});
