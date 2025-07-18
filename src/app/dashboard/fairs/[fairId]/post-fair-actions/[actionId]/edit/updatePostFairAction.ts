"use server";

import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./EditActionForm";

export async function updatePostFairAction(
  actionId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/post-fair-actions/${actionId}`,
      method: "PATCH",
      data: {
        ...data,
        limitDate: new Date(data.limitDate),
      },
    });

    return {
      success: true,
      message: "Acción actualizada correctamente",
    };
  } catch (error) {
    console.error("Error updating action:", error);
    return {
      success: false,
      message: "Error al actualizar la acción",
    };
  }
}
