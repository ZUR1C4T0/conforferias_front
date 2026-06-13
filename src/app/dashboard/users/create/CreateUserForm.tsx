"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { createUser } from "./createUser";
import { defaultValues, schema } from "./form";

export function CreateUserForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  const { errors, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await createUser(data);
    if (result.success) {
      notyf.success(result.message);
      router.push("/dashboard/users");
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Nombre del usuario"
            {...form.register("name")}
            aria-invalid={!!errors.name}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Email del usuario"
            {...form.register("email")}
            aria-invalid={!!errors.email}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña del usuario"
              {...form.register("password")}
              aria-invalid={!!errors.password}
            />
            <InputGroupAddon
              align="inline-end"
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </InputGroupAddon>
          </InputGroup>
          <FieldError errors={[errors.password]} />
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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner data-icon="inline-start" />}
            Crear usuario
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
