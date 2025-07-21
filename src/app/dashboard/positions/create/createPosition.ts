"use server";

import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "./form";

export async function createPosition(data: z.infer<typeof schema>) {
  const positions = await secureFetch<Position[]>({
    url: "/positions",
  });
  const position = positions.find((p) => {
    return p.name.toLowerCase() === data.name.toLowerCase();
  });
  if (position) {
    return {
      success: false,
      message: "El cargo ya existe",
    };
  }

  try {
    await secureFetch({
      url: "/positions",
      method: "POST",
      data,
    });
    return {
      success: true,
      message: "El cargo se creó correctamente",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al crear el cargo",
    };
  }
}
