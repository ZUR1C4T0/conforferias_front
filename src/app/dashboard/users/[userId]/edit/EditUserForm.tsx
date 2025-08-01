"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import z from "zod";
import { updateUser } from "./updateUser";

export const schema = z.object({
  name: z.string().nonempty("Nombre es obligatorio"),
  email: z.string().nonempty("Correo es obligatorio"),
  role: z.enum(["ADMIN", "MERCADEO", "REPRESENTANTE"]),
});

export function EditUserForm({ user }: { user: User }) {
  const router = useRouter();
  const defaultValues = {
    name: user.name,
    email: user.email,
    role: user.role as Role,
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const result = await updateUser(user.id, data);
    if (result.success) {
      notyf.success(result.message);
      router.push("./");
      router.refresh();
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Campo Nombre */}
      <div>
        <label htmlFor="name" className="label-text">
          Nombre
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
          Email
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

      {/* Campo Rol */}
      <div>
        <label htmlFor="role" className="label-text">
          Rol
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

      {/* Botón de envio */}
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={!form.formState.isDirty || form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <>
            <Icon icon="tabler:check" className="size-5" /> Actualizar
          </>
        )}
      </button>
    </form>
  );
}
