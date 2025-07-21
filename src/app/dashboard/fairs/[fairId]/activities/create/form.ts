import z from "zod";

export const schema = z.object({
  type: z.enum(
    ["CHARLA_TECNICA", "RUEDA_DE_NEGOCIOS", "OTRO"],
    "Seleccione un tipo de actividad",
  ),
  description: z.string().trim().nonempty("Descripción es obligatoria"),
  attendees: z.number().nullable().optional(),
});

export const defaultValues: z.infer<typeof schema> = {
  type: "" as "CHARLA_TECNICA" | "RUEDA_DE_NEGOCIOS" | "OTRO",
  description: "",
  attendees: null,
};
