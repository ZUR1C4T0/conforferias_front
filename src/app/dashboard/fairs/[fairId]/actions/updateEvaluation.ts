"use server";

import { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "../components/EvaluateForm";

export async function updateEvaluation(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/evaluation`,
      method: "PUT",
      data,
    });
    revalidatePath(`/dashboard/fairs/${fairId}`);
    return {
      success: true,
      message: "Evaluación actualizada correctamente",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
    return {
      success: false,
      message: "Error al actualizar la evaluación",
    };
  }
}
