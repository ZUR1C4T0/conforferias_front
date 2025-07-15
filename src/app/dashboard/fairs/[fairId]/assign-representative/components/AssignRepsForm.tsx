"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { assignRepresentatives } from "../actions/assign-representatives";
import type { Representative, User } from "../page";

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
    const { error, message } = await assignRepresentatives({
      fairId: fairId as string,
      representatives: data.representatives.map((id) => ({
        userId: id,
      })),
    });
    if (!error) {
      form.reset({
        representatives: representatives.map((rep) => rep.user.id),
      });
    } else {
      alert(message);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full overflow-x-auto"
    >
      <table className="table-lg table">
        <caption className="flex gap-2 p-5 text-left text-base-content">
          <p className="text-base-content/80 text-sm">
            Seleccione los representantes que desea asignar a la feria
          </p>
          <button
            type="submit"
            disabled={!form.formState.isDirty && !form.formState.isSubmitting}
            className="btn btn-primary btn-sm"
          >
            {form.formState.isSubmitting ? (
              <span className="loading loading-dots"></span>
            ) : (
              "Guardar"
            )}
          </button>
        </caption>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="row-hover">
              <td>
                <label className="flex cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    id="representatives"
                    value={user.id}
                    className="checkbox checkbox-primary"
                    {...form.register("representatives")}
                    checked={form.watch("representatives").includes(user.id)}
                  />
                  <span className="label-text">{user.name}</span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
