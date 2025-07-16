"use server";

import { revalidatePath } from "next/cache";
import { secureFetch } from "@/lib/axios";

export default async function addTrackingNote(
  fairId: string,
  contactId: string,
  data: { note: string },
) {
  try {
    await secureFetch({
      url: `/contacts/${contactId}/notes`,
      method: "POST",
      data,
    });
    revalidatePath(`/dashboard/fairs/${fairId}/contacts/${contactId}`);
    return {
      success: true,
      message: "Nota de seguimientoagregada correctamente",
    };
  } catch (error) {
    console.error("Error adding tracking note:", error);
    return {
      success: false,
      message:
        "Error al agregar la nota de seguimiento. Por favor intente nuevamente.",
    };
  }
}
