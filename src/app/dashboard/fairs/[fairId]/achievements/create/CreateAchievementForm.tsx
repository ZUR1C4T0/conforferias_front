"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { createAchievement } from "./createAchievement";
import { schema } from "./form";

export default function CreateAchievementForm({ fairId }: { fairId: string }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { content: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await createAchievement(fairId, data);
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
          <FieldLabel htmlFor="content">Descripción del logro</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="content"
              placeholder="Describa el logro obtenido en la feria..."
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
