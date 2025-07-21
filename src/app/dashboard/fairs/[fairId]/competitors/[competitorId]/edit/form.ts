import z from "zod";

export const schema = z.object({
  company: z.string().min(1, "Nombre de empresa es obligatorio"),
  country: z.string().min(1, "País es obligatorio"),
  city: z.string().nullable(),
  featuredProducts: z.string().min(1, "Productos destacados son obligatorios"),
  strengths: z.string().min(1, "Debe especificar al menos una fortaleza"),
  weaknesses: z.string().min(1, "Debe especificar al menos una debilidad"),
});
