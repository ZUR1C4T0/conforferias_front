import z from "zod";

export const schema = z.object({
  company: z.string().nonempty("Nombre es obligatorio"),
  country: z.string().nonempty("País es obligatorio"),
  city: z.string().nullable(),
  featuredProducts: z.string().trim().nonempty("Campo obligatorio"),
  strengths: z.string().trim().nonempty("Campo obligatorio"),
  weaknesses: z.string().trim().nonempty("Campo obligatorio"),
});

export const defaultValues: z.infer<typeof schema> = {
  company: "",
  country: "",
  city: null,
  featuredProducts: "",
  strengths: "",
  weaknesses: "",
};
