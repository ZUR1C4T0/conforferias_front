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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { createTrend } from "./createTrend";

export const schema = z.object({
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  details: z.string().nullable(),
});

export default function CreateTrendForm({ fairId }: { fairId: string }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      details: null,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await createTrend(fairId, data);
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
        <Field data-invalid={!!form.formState.errors.title}>
          <FieldLabel htmlFor="title">Título</FieldLabel>
          <Input
            type="text"
            id="title"
            {...form.register("title")}
            aria-invalid={!!form.formState.errors.title}
          />
          <FieldError errors={[form.formState.errors.title]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.details}>
          <FieldLabel htmlFor="details">Detalles (Opcional)</FieldLabel>
          <Textarea
            id="details"
            placeholder="Describa la tendencia observada..."
            {...form.register("details")}
            aria-invalid={!!form.formState.errors.details}
          />
          <FieldError errors={[form.formState.errors.details]} />
        </Field>

        <Field>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Spinner data-icon="inline-start" />
            )}
            Guardar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
