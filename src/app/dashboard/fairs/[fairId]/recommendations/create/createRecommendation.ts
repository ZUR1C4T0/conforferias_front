"use server";

import { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./CreateRecommendationForm";

export async function createRecommendation(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/recommendations`,
      method: "POST",
      data,
    });
    revalidatePath(`/dashboard/fairs/${fairId}`);
    return {
      success: true,
      message: "Recomendación creada correctamente",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error("Error creating recommendation:", error);
    }
    return {
      success: false,
      message: "Error al crear la recomendación",
    };
  }
}
