"use server";

import { revalidatePath } from "next/cache";
import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./form";

export async function createUser(data: z.infer<typeof schema>) {
  try {
    await secureFetch({
      url: "/users",
      method: "POST",
      data,
    });
    revalidatePath("/dashboard/users");
    return { success: true, message: "Usuario creado exitosamente" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "Error al crear el usuario" };
  }
}
