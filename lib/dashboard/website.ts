export type WebsiteDetail = {
  url: string;
  domain: string;
  hostingStatus: string;
  hostingBadgeClass: string;
  lastUpdate: string;
  projectStatus: string;
  projectBadgeClass: string;
};

export function getWebsiteDetail(): WebsiteDetail {
  return {
    url: "https://harborandco-demo.com",
    domain: "harborandco-demo.com",
    hostingStatus: "Live",
    hostingBadgeClass: "db-badge-active",
    lastUpdate: "Today, 10:14 AM",
    projectStatus: "In Progress",
    projectBadgeClass: "db-badge-progress",
  };
}
