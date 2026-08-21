export type DashboardServiceDetail = {
  name: string;
  status: string;
  badgeClass: string;
  description: string;
  startDate: string;
  price: string;
};

export function getDashboardServiceDetails(): DashboardServiceDetail[] {
  return [
    {
      name: "Website Design",
      status: "Active",
      badgeClass: "db-badge-active",
      description: "Your custom website build, hosting, and ongoing design updates.",
      startDate: "Jul 1, 2026",
      price: "$XXX/mo",
    },
    {
      name: "SEO",
      status: "In Progress",
      badgeClass: "db-badge-progress",
      description: "Local and technical SEO work to help you rank for the searches that bring customers in.",
      startDate: "Jul 15, 2026",
      price: "$XXX/mo",
    },
    {
      name: "AI Solutions",
      status: "Paused",
      badgeClass: "db-badge-paused",
      description: "Your site's AI chat assistant, handling common questions and booking requests.",
      startDate: "Aug 1, 2026",
      price: "$XXX/mo",
    },
    {
      name: "Business Automation",
      status: "Active",
      badgeClass: "db-badge-active",
      description: "Automated booking confirmations, reminders, and follow-up workflows.",
      startDate: "Jul 8, 2026",
      price: "$XXX/mo",
    },
  ];
}
