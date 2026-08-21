export type ContactFormState = {
  submitCount: number;
  errors: Partial<Record<"name" | "email" | "phone" | "message", string>>;
  values: { name: string; email: string; phone: string; message: string };
};

export const initialContactFormState: ContactFormState = {
  submitCount: 0,
  errors: {},
  values: { name: "", email: "", phone: "", message: "" },
};
