"use server";

import { revalidatePath } from "next/cache";
import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./form";

export async function createAchievement(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/achievements`,
      method: "POST",
      data,
    });
    revalidatePath(`/dashboard/fairs/${fairId}`);
    return { success: true, message: "Logro creado exitosamente" };
  } catch (error) {
    console.error("Error creating achievement:", error);
    return { success: false, message: "Error al crear el logro" };
  }
}
