"use server";

import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./CreateTrendForm";

export async function createTrend(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/tendencies`,
      method: "POST",
      data,
    });

    return {
      success: true,
      message: "Tendencia creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating trend:", error);
    return {
      success: false,
      message: "Error al crear la tendencia.",
    };
  }
}
