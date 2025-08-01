"use server";

import { revalidatePath } from "next/cache";
import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./form";

export async function createActivity(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/activities`,
      method: "POST",
      data,
    });
    revalidatePath(`/dashboard/fairs/${fairId}`);
    return {
      success: true,
      message: "Actividad creada correctamente",
    };
  } catch (error) {
    console.error("Error creating activity:", error);
    return {
      success: false,
      message: "Error al crear la actividad.",
    };
  }
}
