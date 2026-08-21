export type ServiceStatus = { name: string; detail: string; status: string; badgeClass: string };
export type NotificationItem = { message: string; timeAgo: string; unread: boolean };
export type ActivityItem = { description: string; timestamp: string };

export function getServiceStatuses(): ServiceStatus[] {
  return [
    { name: "Website", detail: "harborandco-demo.com", status: "Active", badgeClass: "db-badge-active" },
    { name: "SEO", detail: "Local + technical SEO", status: "In Progress", badgeClass: "db-badge-progress" },
    { name: "Business Automation", detail: "Booking & follow-up workflows", status: "Active", badgeClass: "db-badge-active" },
    { name: "AI Solutions", detail: "Site chat assistant", status: "Needs Attention", badgeClass: "db-badge-attention" },
  ];
}

export function getNotifications(): NotificationItem[] {
  return [
    { message: "Your website update has been published.", timeAgo: "2 hours ago", unread: true },
    { message: "New message from your account manager.", timeAgo: "1 day ago", unread: true },
    { message: "Your monthly SEO report is ready to view.", timeAgo: "3 days ago", unread: false },
    { message: "Invoice #1042 has been paid.", timeAgo: "5 days ago", unread: false },
  ];
}

export function getRecentActivity(): ActivityItem[] {
  return [
    { description: "Website updated — homepage copy revised", timestamp: "Today, 10:14 AM" },
    { description: "New message received from the Doshi and Yengo team", timestamp: "Yesterday, 3:45 PM" },
    { description: "Invoice #1042 paid", timestamp: "Aug 15, 2026" },
    { description: "Monthly SEO report generated", timestamp: "Aug 12, 2026" },
    { description: 'Automation workflow "Appointment Reminders" activated', timestamp: "Aug 8, 2026" },
  ];
}
