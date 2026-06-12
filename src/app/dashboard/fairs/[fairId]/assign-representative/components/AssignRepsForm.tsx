"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { Notyf } from "notyf";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { assignRepresentatives } from "../actions/assign-representatives";

interface Props {
  users: User[];
  representatives: Representative[];
}

const schema = z.object({
  representatives: z.array(z.string()),
});

export default function AssignRepsForm({ users, representatives }: Props) {
  const { fairId } = useParams();
  const defaultValues: z.infer<typeof schema> = {
    representatives: representatives.map((rep) => rep.user.id as string),
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    form.reset({
      representatives: representatives.map((rep) => {
        return rep.user.id;
      }),
    });
  }, [representatives, form.reset]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    const reprs = data.representatives.map((id) => {
      return { userId: id };
    });
    const { error, message } = await assignRepresentatives({
      fairId: fairId as string,
      representatives: reprs,
    });
    if (!error) {
      notyf.success(message);
      form.reset({
        representatives: representatives.map((rep) => rep.user.id),
      });
    } else {
      notyf.error(message);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full overflow-x-auto"
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend></FieldLegend>
          <FieldDescription className="flex flex-nowrap gap-2">
            <span className="grow">
              Seleccione los representantes que desea asignar a la feria
            </span>
            <Button
              type="submit"
              disabled={!form.formState.isDirty && !form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Spinner data-icon="inline-start" />
              )}
              Guardar
            </Button>
          </FieldDescription>

          <FieldGroup className="gap-3">
            <Controller
              control={form.control}
              name="representatives"
              render={({ field }) => (
                <>
                  {users.map((user) => (
                    <FieldLabel key={user.id} className="cursor-pointer">
                      <Field orientation="horizontal">
                        <Checkbox
                          checked={field.value.includes(user.id)}
                          onCheckedChange={(checked) => {
                            const updatedValues = checked
                              ? [...field.value, user.id]
                              : field.value.filter((id) => id !== user.id);
                            const orderedValues = users
                              .filter((u) => updatedValues.includes(u.id))
                              .map((u) => u.id);
                            field.onChange(orderedValues);
                          }}
                        />
                        <FieldContent>
                          <FieldTitle className="font-medium text-sm leading-none">
                            {user.name}
                          </FieldTitle>
                          <FieldDescription className="text-muted-foreground text-xs">
                            {user.email}
                          </FieldDescription>
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  ))}
                </>
              )}
            />
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
