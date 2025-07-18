"use server";

import { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";
import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./CreateImprovementForm";

export async function createImprovement(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/improvements`,
      method: "POST",
      data,
    });
    revalidatePath(`/dashboard/fairs/${fairId}`);
    return {
      success: true,
      message: "Área de mejora registrada correctamente",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error("Error creating improvement area:", error);
    }
    return { success: false, message: "Error al registrar el área de mejora" };
  }
}
