import z from "zod";

export const schema = z.object({
  name: z.string().nonempty("El nombre es requerido"),
  description: z.string().optional(),
});

export const defaultValues: z.infer<typeof schema> = {
  name: "",
  description: "",
};
