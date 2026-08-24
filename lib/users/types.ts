export type UserRole = "CUSTOMER" | "OWNER";

export type User = {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string | null;
  passwordHash: string;
  role: UserRole;
  emailConfirmed: boolean;
  confirmationToken: string;
  confirmationTokenExpiresAt: Date;
  createdAt: Date;
};
