"use server";

import { revalidatePath } from "next/cache";
import { secureFetch } from "@/lib/axios";

export async function assignRepresentatives({
  fairId,
  representatives,
}: {
  fairId: string;
  representatives: { userId: string }[];
}) {
  try {
    await secureFetch({
      url: `/fairs/${fairId}/representatives`,
      method: "PUT",
      data: { representatives },
    });
    revalidatePath(`/dashboard/fairs/${fairId}/assign-representative`);
    return {
      error: false,
      message: "Representantes asignados correctamente",
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "Ocurrió un error al asignar representantes",
    };
  }
}
