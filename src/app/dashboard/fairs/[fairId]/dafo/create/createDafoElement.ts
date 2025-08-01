"use server";

import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./CreateDafoForm";

export async function createDafoElement(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/dafo`,
      method: "POST",
      data,
    });

    return {
      success: true,
      message: "Elemento DAFO creado exitosamente",
    };
  } catch (error) {
    console.error("Error creating DAFO element:", error);
    return {
      success: false,
      message: "Error al crear el elemento DAFO.",
    };
  }
}
