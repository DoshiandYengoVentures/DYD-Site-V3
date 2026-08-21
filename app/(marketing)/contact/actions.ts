"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import type { ContactFormState } from "./state";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address."),
  phone: z.string().trim(),
  message: z
    .string()
    .trim()
    .min(1, "Please tell us a bit about your project.")
    .max(2000, "Message is too long."),
});

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = ContactSchema.safeParse(values);

  if (!parsed.success) {
    const errors: ContactFormState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormState["errors"];
      if (!errors[field]) errors[field] = issue.message;
    }
    return { submitCount: prevState.submitCount + 1, errors, values };
  }

  console.log(
    `New contact form submission — name: ${parsed.data.name}, email: ${parsed.data.email}, phone: ${parsed.data.phone}, message: ${parsed.data.message}`
  );

  redirect("/contact?submitted=true");
}
