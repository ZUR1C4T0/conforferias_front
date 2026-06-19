"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ThumbsDown, ThumbsUp, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { DafoType } from "@/lib/constants";
import { createDafoElement } from "./createDafoElement";

export const schema = z.object({
  type: z.enum(DafoType, "Seleccione un tipo"),
  description: z
    .string()
    .trim()
    .nonempty("La descripción no puede estar vacía"),
});

export default function CreateDafoForm({ fairId }: { fairId: string }) {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      type: "" as DafoType,
      description: "",
    },
  });

  const typeIcons = {
    [DafoType.DEBILIDAD]: ThumbsDown,
    [DafoType.AMENAZA]: AlertTriangle,
    [DafoType.FORTALEZA]: ThumbsUp,
    [DafoType.OPORTUNIDAD]: Zap,
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await createDafoElement(fairId, data);
    if (result.success) {
      toast.success(result.message);
      form.reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="@container">
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.type}>
          <FieldLabel htmlFor="type">Tipo DAFO</FieldLabel>
          <RadioGroup
            className="@sm:grid-cols-2"
            value={form.watch("type")}
            onValueChange={(value) =>
              form.setValue("type", value as DafoType, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          >
            {Object.values(DafoType).map((type) => {
              const IconComponent = typeIcons[type];
              return (
                <FieldLabel
                  key={type}
                  htmlFor={`dafo-${type}`}
                  className="cursor-pointer"
                >
                  <Field orientation="horizontal">
                    <FieldContent>
                      <div className="flex items-center gap-2">
                        <IconComponent className="size-4" />
                        <FieldTitle className="capitalize">
                          {type.toLowerCase()}
                        </FieldTitle>
                      </div>
                    </FieldContent>
                    <RadioGroupItem
                      value={type}
                      id={`dafo-${type}`}
                      aria-invalid={!!form.formState.errors.type}
                    />
                  </Field>
                </FieldLabel>
              );
            })}
          </RadioGroup>
          <FieldError errors={[form.formState.errors.type]} />
        </Field>

        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="description">Descripción</FieldLabel>
          <Textarea
            id="description"
            rows={5}
            placeholder="Describa el elemento DAFO..."
            {...form.register("description")}
            aria-invalid={!!form.formState.errors.description}
          />
          <FieldError errors={[form.formState.errors.description]} />
        </Field>

        <Field>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Spinner data-icon="inline-start" />
            )}
            Crear elemento
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
