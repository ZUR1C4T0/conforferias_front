"use server";

import { revalidatePath } from "next/cache";
import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./CreateFairForm";

export async function createFair(data: z.infer<typeof schema>) {
  try {
    const { logo, ...fairData } = data;
    const { id } = await secureFetch<{ id: string }>({
      url: "/fairs",
      method: "POST",
      data: fairData,
    });
    const error = await uploadFairLogo(id, logo[0]);
    if (error) throw error;
    revalidatePath("/dashboard/fairs");
    return {
      success: true,
      message: "Feria creada exitosamente",
    };
  } catch (error) {
    console.error("Error creating fair:", error);
    return {
      success: false,
      message: "Error al crear la feria.",
    };
  }
}

async function uploadFairLogo(fairId: string, logo: File) {
  const formData = new FormData();
  formData.append("logo", logo);
  try {
    await secureFetch({
      url: `/fairs/${fairId}/logo`,
      adapter: "http",
      method: "PUT",
      data: formData,
    });
    return null;
  } catch (error) {
    console.error("Error uploading fair logo:", error);
    return error;
  }
}
