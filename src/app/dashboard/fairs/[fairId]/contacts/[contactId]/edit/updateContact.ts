"use server";

import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./EditContactForm";

export async function updateContact(
  fairId: string,
  contactId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/contacts/${contactId}`,
      method: "PATCH",
      data,
    });

    return { success: true, message: "Contacto actualizado correctamente" };
  } catch (error) {
    console.error("Error updating contact:", error);
    return {
      success: false,
      message: "Error al actualizar el contacto.",
    };
  }
}
