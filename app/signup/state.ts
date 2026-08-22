export type SignupState = {
  submitCount: number;
  errors: Partial<Record<"businessName" | "contactName" | "email" | "password" | "confirmPassword", string>>;
  values: { businessName: string; contactName: string; email: string };
};

export const initialSignupState: SignupState = {
  submitCount: 0,
  errors: {},
  values: { businessName: "", contactName: "", email: "" },
};
