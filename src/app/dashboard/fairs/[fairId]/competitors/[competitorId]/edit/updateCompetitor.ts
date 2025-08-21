"use server";

import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./form";

export async function updateCompetitor(
  fairId: string,
  competitorId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/competitors/${competitorId}`,
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
      message: "Error al actualizar el competidor.",
    };
  }
}
