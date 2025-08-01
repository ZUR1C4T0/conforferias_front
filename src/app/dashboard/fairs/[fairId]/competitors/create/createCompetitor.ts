"use server";

import { revalidatePath } from "next/cache";
import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./form";

export async function createCompetitor(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/competitors`,
      method: "POST",
      data,
    });
    revalidatePath(`/dashboard/fairs/${fairId}`);
    return {
      success: true,
      message: "Competidor creado correctamente",
    };
  } catch (error) {
    console.error("Error creating competitor:", error);
    return {
      success: false,
      message: "Error al crear el competidor.",
    };
  }
}
