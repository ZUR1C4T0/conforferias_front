"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import type z from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import { createUser } from "./createUser";
import { defaultValues, schema } from "./form";

export default function CreateUserForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Campo Nombre */}
      <div>
        <label htmlFor="name" className="label-text">
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          className={`input ${form.formState.errors.name ? "is-invalid" : ""}`}
          placeholder="Nombre del usuario..."
          {...form.register("name")}
        />
        <span className="helper-text">
          {form.formState.errors.name?.message}
        </span>
      </div>

      {/* Campo Email */}
      <div>
        <label htmlFor="email" className="label-text">
          Email *
        </label>
        <input
          type="email"
          id="email"
          className={`input ${form.formState.errors.email ? "is-invalid" : ""}`}
          placeholder="Email del usuario..."
          {...form.register("email")}
        />
        <span className="helper-text">
          {form.formState.errors.email?.message}
        </span>
      </div>

      {/* Campo Contraseña */}
      <div>
        <label htmlFor="password" className="label-text">
          Contraseña *
        </label>
        <input
          type="password"
          id="password"
          className={`input ${form.formState.errors.password ? "is-invalid" : ""}`}
          placeholder="Contraseña..."
          {...form.register("password")}
        />
        <span className="helper-text">
          {form.formState.errors.password?.message}
        </span>
      </div>

      {/* Campo Rol */}
      <div>
        <label htmlFor="role" className="label-text">
          Rol *
        </label>
        <select
          id="role"
          className={`select ${form.formState.errors.role ? "is-invalid" : ""}`}
          {...form.register("role")}
        >
          <option value="ADMIN">Administrador</option>
          <option value="MERCADEO">Mercadeo</option>
          <option value="REPRESENTANTE">Representante</option>
        </select>
        <span className="helper-text">
          {form.formState.errors.role?.message}
        </span>
      </div>

      <SubmitButton>
        <Icon icon="tabler:check" className="size-5" /> Crear
      </SubmitButton>
    </form>
  );
}
