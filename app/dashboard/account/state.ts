export type ProfileState = {
  submitCount: number;
  errors: Partial<Record<"businessName" | "contactName" | "phone", string>>;
  values: { businessName: string; contactName: string; phone: string };
  success: boolean;
};

export type PasswordState = {
  submitCount: number;
  errors: Partial<Record<"currentPassword" | "newPassword" | "confirmPassword", string>>;
  success: boolean;
};

export const initialPasswordState: PasswordState = {
  submitCount: 0,
  errors: {},
  success: false,
};
