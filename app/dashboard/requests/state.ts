export type CreateRequestState = {
  submitCount: number;
  errors: Partial<Record<"title" | "description" | "category" | "priority", string>>;
  values: { title: string; description: string; category: string; priority: string };
};

export const initialCreateRequestState: CreateRequestState = {
  submitCount: 0,
  errors: {},
  values: { title: "", description: "", category: "", priority: "" },
};
