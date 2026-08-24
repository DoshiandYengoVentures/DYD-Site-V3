import * as repository from "./repository";
import type { ContactSubmission } from "./types";

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<ContactSubmission> {
  return repository.insertSubmission(data);
}

export async function listSubmissions(): Promise<ContactSubmission[]> {
  return repository.findAll();
}
