"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Notyf } from "notyf";
import { useForm } from "react-hook-form";
import z from "zod";
import { SubmitButton } from "@/components/SubmitButton";
import addTrackingNote from "./addTrackingNote";

export const schema = z.object({
  note: z.string().trim().nonempty("No puedes dejar el campo vacío"),
});

const defaultValues: z.infer<typeof schema> = {
  note: "",
};

export default function AddTrackingPage() {
  const { fairId, contactId } = useParams();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const notyf = new Notyf();
    if (!fairId || !contactId) return;
    const result = await addTrackingNote(
      fairId.toString(),
      contactId.toString(),
      data,
    );
    if (result.success) {
      notyf.success(result.message);
      router.push("./");
    } else {
      notyf.error(result.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/dashboard/fairs/${fairId}/contacts/${contactId}`}
          className="btn btn-secondary btn-soft btn-circle"
        >
          <Icon icon="tabler:arrow-left" className="size-5" />
        </Link>
        <h1 className="grow font-semibold text-xl sm:text-3xl">
          Agregar Nota de Seguimiento
        </h1>
      </div>

      <div className="card card-border">
        <div className="card-body">
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="note" className="label-text">
                Nota
              </label>
              <textarea
                id="note"
                className={`textarea ${form.formState.errors.note ? "is-invalid" : ""}`}
                placeholder="Escribe los detalles del seguimiento..."
                rows={5}
                {...form.register("note")}
              ></textarea>
            </div>

            <SubmitButton>
              <Icon icon="tabler:check" className="size-4" /> Guardar Nota
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
