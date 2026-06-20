import z from "zod";

export const schema = z.object({
  name: z.string().trim().nonempty("El nombre es requerido"),
  email: z
    .email("El email es inválido")
    .trim()
    .nonempty("El email es requerido"),
  password: z
    .string()
    .trim()
    .nonempty("La contraseña es requerida")
    .min(6, "La contraseña debe tener mínimo 6 caracteres"),
  role: z.enum<Role[]>(
    ["ADMIN", "MERCADEO", "REPRESENTANTE"],
    "El rol es requerido",
  ),
});

export const defaultValues: z.infer<typeof schema> = {
  name: "",
  email: "",
  password: "",
  role: "REPRESENTANTE",
};
