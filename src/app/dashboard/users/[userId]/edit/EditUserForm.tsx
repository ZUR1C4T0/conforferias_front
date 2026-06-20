"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { updateUser } from "./updateUser";

export const schema = z.object({
  name: z.string().trim().nonempty("Nombre es obligatorio"),
  email: z.string().trim().nonempty("Correo es obligatorio"),
  role: z.enum(["ADMIN", "MERCADEO", "REPRESENTANTE"], "Rol es obligatorio"),
});

export function EditUserForm({ user }: { user: User }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role as Role,
    },
  });

  const { errors, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await updateUser(user.id, data);
    if (result.success) {
      toast.success(result.message);
      router.push("../");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <Input
            type="text"
            id="name"
            placeholder="Nombre del usuario..."
            {...form.register("name")}
            data-invalid={!!errors.name}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            type="email"
            id="email"
            placeholder="Email del usuario..."
            {...form.register("email")}
            data-invalid={!!errors.email}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.role}>
          <FieldLabel htmlFor="role">Rol</FieldLabel>
          <Select
            value={form.watch("role")}
            onValueChange={(value) => form.setValue("role", value as Role)}
          >
            <SelectTrigger id="role" aria-invalid={!!errors.role}>
              <SelectValue placeholder="Seleccione un rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Administrador</SelectItem>
              <SelectItem value="MERCADEO">Mercadeo</SelectItem>
              <SelectItem value="REPRESENTANTE">Representante</SelectItem>
            </SelectContent>
          </Select>
          <FieldError errors={[errors.role]} />
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={!form.formState.isDirty || isSubmitting}
          >
            {isSubmitting && <Spinner data-icon="inline-start" />}
            Actualizar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
