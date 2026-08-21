export const REQUEST_CATEGORIES = [
  { value: "WEBSITE_DESIGN", label: "Website Design" },
  { value: "AUTOMATION", label: "Automation" },
  { value: "AI_SOLUTIONS", label: "AI Solutions" },
  { value: "SEO", label: "SEO" },
  { value: "OTHER", label: "Other" },
] as const;
export type RequestCategory = (typeof REQUEST_CATEGORIES)[number]["value"];

export const REQUEST_PRIORITIES = [
  { value: "LOW", label: "Low", badgeClass: "db-badge-priority-low" },
  { value: "MEDIUM", label: "Medium", badgeClass: "db-badge-priority-medium" },
  { value: "HIGH", label: "High", badgeClass: "db-badge-priority-high" },
] as const;
export type RequestPriority = (typeof REQUEST_PRIORITIES)[number]["value"];

export const REQUEST_STATUSES = [
  { value: "SUBMITTED", label: "Submitted", badgeClass: "db-badge-status-submitted" },
  { value: "IN_PROGRESS", label: "In Progress", badgeClass: "db-badge-status-progress" },
  { value: "WAITING_FOR_CLIENT", label: "Waiting for Client", badgeClass: "db-badge-status-waiting" },
  { value: "COMPLETED", label: "Completed", badgeClass: "db-badge-status-completed" },
] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number]["value"];

export function categoryLabel(value: RequestCategory): string {
  return REQUEST_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
export function priorityMeta(value: RequestPriority) {
  return REQUEST_PRIORITIES.find((p) => p.value === value)!;
}
export function statusMeta(value: RequestStatus) {
  return REQUEST_STATUSES.find((s) => s.value === value)!;
}

export type ClientRequest = {
  id: string;
  username: string;
  title: string;
  description: string;
  category: RequestCategory;
  priority: RequestPriority;
  status: RequestStatus;
  submittedAt: Date;
};

export function formatSubmittedAt(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
