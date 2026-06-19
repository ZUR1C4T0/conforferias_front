"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { createImprovement } from "./createImprovement";

export const schema = z.object({
  content: z
    .string()
    .trim()
    .nonempty("La descripción es obligatoria")
    .max(1000, "Máximo 1000 caracteres"),
});

export default function CreateImprovementForm({ fairId }: { fairId: string }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { content: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await createImprovement(fairId, data);
    if (result.success) {
      toast.success(result.message);
      form.reset();
    } else {
      toast.error(result.message);
    }
  };

  const contentValue = form.watch("content") || "";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.content}>
          <FieldLabel htmlFor="content">
            Descripción del área de mejora
          </FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="content"
              placeholder="Describa las oportunidades de mejora identificadas..."
              maxLength={1000}
              {...form.register("content")}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText
                className={cn({
                  "text-danger": contentValue.length >= 1000,
                })}
              >
                {contentValue.length}/1000
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <FieldError errors={[form.formState.errors.content]} />
        </Field>

        <Field>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Spinner data-icon="inline-start" />
            )}
            Registrar mejora
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
