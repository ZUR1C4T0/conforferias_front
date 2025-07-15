"use server";

import type z from "zod";
import { secureFetch } from "@/lib/axios";
import type { schema } from "../components/CreateContactForm";

export async function createContact(
  fairId: string,
  data: z.infer<typeof schema>,
) {
  try {
    await secureFetch<Contact>({
      url: `/fairs/${fairId}/contacts`,
      method: "POST",
      data,
    });
    return true;
  } catch {
    return false;
  }
}
