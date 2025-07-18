"use server";

import { isAxiosError } from "axios";
import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./CreateActionForm";

export async function createPostFairAction(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/post-fair-actions`,
      method: "POST",
      data: {
        ...data,
        limitDate: new Date(data.limitDate),
      },
    });

    return {
      success: true,
      message: "Acción postferia creada exitosamente",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error("Error creating post-fair action:", error);
    }
    return {
      success: false,
      message: "Error al crear la acción. Por favor intente nuevamente.",
    };
  }
}
