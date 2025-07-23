import z from "zod";

export const schema = z.object({
  name: z.string().nonempty("El nombre es requerido"),
  email: z.email("El email es inválido").nonempty("El email es requerido"),
  password: z.string().nonempty("La contraseña es requerida"),
  role: z.enum<Role[]>(["ADMIN", "MERCADEO", "REPRESENTANTE"]),
});

export const defaultValues: z.infer<typeof schema> = {
  name: "",
  email: "",
  password: "",
  role: "REPRESENTANTE",
};
