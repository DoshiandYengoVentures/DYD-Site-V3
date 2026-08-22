export type User = {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  passwordHash: string;
  emailConfirmed: boolean;
  confirmationToken: string;
  confirmationTokenExpiresAt: Date;
  createdAt: Date;
};
