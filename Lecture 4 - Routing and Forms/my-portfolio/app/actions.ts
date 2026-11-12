"use server";

import { revalidatePath } from "next/cache";
import { addMessage } from "@/lib/messages";

export async function submitContact(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !message) {
    return;
  }

  await addMessage(name, message);
  revalidatePath("/");
}
