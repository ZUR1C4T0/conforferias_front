"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import countries from "@/assets/countries.json";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Item, ItemHeader } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { createFair } from "../actions/createFair";

/** Fecha actual en formato YYYY-MM-DD */
const TODAY = new Date().toISOString().split("T")[0];

export const schema = z
  .object({
    name: z
      .string()
      .nonempty("El nombre es requerido")
      .max(100, "Máximo 100 caracteres"),
    startDate: z.string().nonempty("La fecha de inicio es requerida"),
    endDate: z.string().nonempty("La fecha de fin es requerida"),
    country: z
      .string()
      .nonempty("El país es requerido")
      .max(100, "Máximo 100 caracteres"),
    city: z
      .string()
      .max(100, "Máximo 100 caracteres")
      .optional()
      .transform((val) => val?.trim() || undefined),
    standNumber: z
      .string()
      .nonempty("El número de stand es requerido")
      .max(100, "Máximo 100 caracteres"),
    areaM2: z
      .number("El área debe ser un número")
      .positive("El área debe ser mayor a 0")
      .max(1000, "Máximo 1000 m2"),
    totalInvestment: z.optional(
      z.number().min(0, "El monto no puede ser negativo"),
    ),
    logo: z
      .custom<FileList>((val) =>
        typeof window !== "undefined" ? val instanceof FileList : true,
      )
      .refine((files) => files.length > 0, "El logo es obligatorio")
      .refine(
        (files) => files[0]?.type.startsWith("image/"),
        "El logo debe ser una imagen",
      )
      .refine((files) => files[0]?.size <= 5 * 1024 * 1024, "Máximo 5MB"),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    path: ["endDate"],
    message: "La fecha de fin no puede ser anterior a la de inicio",
  });

export function CreateFairform() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      startDate: "",
      endDate: "",
      country: "",
      city: "",
      standNumber: "",
      areaM2: undefined,
      totalInvestment: undefined,
      logo: undefined,
    },
  });

  const value = form.watch("logo");
  const previewUrl =
    value instanceof FileList && value.length > 0
      ? URL.createObjectURL(value[0])
      : null;

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const result = await createFair(data);
    if (!result.success) {
      return toast.error(result.message);
    } else {
      toast.success(result.message);
      return router.push("./");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">
                Nombre de la feria <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Nombre de la feria"
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldSeparator className="col-span-full" />

        <Controller
          name="startDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="startDate">
                Fecha de inicio <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="startDate"
                type="date"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                min={TODAY}
                max={form.watch("endDate")}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="endDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="endDate">
                Fecha de finalización{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="endDate"
                type="date"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                min={form.watch("startDate") || TODAY}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="country"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="country">
                País <span className="text-destructive">*</span>
              </FieldLabel>
              <Combobox
                items={countries}
                value={field.value}
                onValueChange={(val) => field.onChange(val ?? "")}
                autoHighlight
              >
                <ComboboxInput
                  {...field}
                  id="country"
                  placeholder="Buscar país"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  showClear
                />
                <ComboboxContent>
                  <ComboboxEmpty>No se encontraron resultados...</ComboboxEmpty>
                  <ComboboxList>
                    {(country) => (
                      <ComboboxItem key={country} value={country}>
                        {country}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="city"> Ciudad (Opcional)</FieldLabel>
              <Input
                {...field}
                id="city"
                aria-invalid={fieldState.invalid}
                placeholder="Ciudad donde se realizará"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldSeparator className="col-span-full" />

        <Controller
          name="standNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="standNumber">
                Stand <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="standNumber"
                aria-invalid={fieldState.invalid}
                placeholder="Número de stand"
                autoComplete="off"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="areaM2"
          control={form.control}
          render={({ field: { value, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="areaM2">
                Área (m²) <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="areaM2"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Area del stand en metros cuadrados"
                autoComplete="off"
                min={0}
                step="any"
                defaultValue={value}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="totalInvestment"
          control={form.control}
          render={({ field: { value, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="totalInvestment">
                Inversión total <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="totalInvestment"
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="Monto invertido en la feria"
                autoComplete="off"
                min={0}
                defaultValue={value}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldSeparator className="col-span-full" />

        <Controller
          name="logo"
          control={form.control}
          render={({ field: { value, onChange, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="logo">
                Logo de la feria <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                type="file"
                id="logo"
                accept="image/png, image/jpeg, image/jpg"
                aria-invalid={fieldState.invalid}
                onChange={(e) => onChange(e.target.files)}
                required
              />
              {!fieldState.invalid ? (
                <FieldDescription>Tamaño máximo de 5MB.</FieldDescription>
              ) : (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Item variant="outline" className="p-1">
          <ItemHeader>
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Vista previa"
                className="mx-auto aspect-square object-contain"
                width={90}
                height={90}
                onLoad={() => URL.revokeObjectURL(previewUrl)}
              />
            )}
          </ItemHeader>
        </Item>

        <Field orientation="horizontal" className="col-span-full">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Spinner data-icon="inline-start" />
            )}
            Crear
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
