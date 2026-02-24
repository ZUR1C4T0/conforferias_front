import * as z from "zod";

export const createFairSchema = z
  .object({
    name: z
      .string()
      .nonempty("El nombre es requerido")
      .max(100, "Máximo 100 caracteres"),
    startDate: z.string().nonempty("La fecha de inicio es requerida"),
    endDate: z.string().nonempty("La fecha de fin es requerida"),
    country: z
      .string()
      .nonempty("El país es requerido")
      .max(100, "Máximo 100 caracteres"),
    city: z
      .string()
      .max(100, "Máximo 100 caracteres")
      .optional()
      .transform((val) => val?.trim() || undefined),
    standNumber: z
      .string()
      .nonempty("El número de stand es requerido")
      .max(100, "Máximo 100 caracteres"),
    areaM2: z
      .number("El área debe ser un número")
      .positive("El área debe ser mayor a 0")
      .max(1000, "Máximo 1000 m2"),
    totalInvestment: z.optional(
      z.number().min(0, "El monto no puede ser negativo"),
    ),
    logo: z
      .custom<FileList>((val) =>
        typeof window !== "undefined" ? val instanceof FileList : true,
      )
      .refine((files) => files.length > 0, "El logo es obligatorio")
      .refine(
        (files) => files[0]?.type.startsWith("image/"),
        "El logo debe ser una imagen",
      )
      .refine((files) => files[0]?.size <= 5 * 1024 * 1024, "Máximo 5MB"),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    path: ["endDate"],
    message: "La fecha de fin no puede ser anterior a la de inicio",
  });
