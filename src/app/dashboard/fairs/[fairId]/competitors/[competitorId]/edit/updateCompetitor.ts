"use server";

import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./EditCompetitorForm";

export async function updateCompetitor(
  competitorId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/competitors/${competitorId}`,
      method: "PATCH",
      data,
    });

    return {
      success: true,
      message: "Competidor actualizado correctamente",
    };
  } catch (error) {
    console.error("Error updating competitor:", error);
    return {
      success: false,
      message:
        "Error al actualizar el competidor. Por favor intente nuevamente.",
    };
  }
}
