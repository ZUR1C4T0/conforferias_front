"use server";

import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./EditUserForm";

export async function updateUser(userId: string, data: z.infer<typeof schema>) {
  try {
    await secureFetch({
      url: `/users/${userId}`,
      method: "PATCH",
      data,
    });

    return {
      success: true,
      message: "Usuario actualizado correctamente",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Error al actualizar el usuario.",
    };
  }
}
