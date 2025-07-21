import z from "zod";

export const schema = z.object({
  note: z.string().trim().nonempty("No puedes dejar el campo vacío"),
});

export const defaultValues: z.infer<typeof schema> = {
  note: "",
};
