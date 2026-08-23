export type ChangeDirection = "up" | "down" | "flat";

export type OverviewStat = {
  label: string;
  value: string;
  change: string;
  direction: ChangeDirection;
};

export type TrafficSource = {
  source: string;
  sessions: number;
  percentage: number;
};

export type TopPage = {
  path: string;
  views: number;
  avgTime: string;
};

/**
 * All demo data below. Connecting Google Analytics later means replacing
 * the bodies of these three functions with calls to the GA4 Data API
 * (https://developers.google.com/analytics/devguides/reporting/data/v1) -
 * the page only depends on these return shapes, not on how they're
 * produced.
 */

export function getOverviewStats(): OverviewStat[] {
  return [
    { label: "Visitors", value: "3,842", change: "+12.4% vs last month", direction: "up" },
    { label: "Sessions", value: "5,109", change: "+8.1% vs last month", direction: "up" },
    { label: "Leads", value: "47", change: "-3.2% vs last month", direction: "down" },
    { label: "Avg. Session Duration", value: "2m 14s", change: "No change", direction: "flat" },
  ];
}

export function getTrafficSources(): TrafficSource[] {
  return [
    { source: "Organic Search", sessions: 2143, percentage: 42 },
    { source: "Direct", sessions: 1327, percentage: 26 },
    { source: "Social", sessions: 817, percentage: 16 },
    { source: "Referral", sessions: 510, percentage: 10 },
    { source: "Email", sessions: 312, percentage: 6 },
  ];
}

export function getTopPages(): TopPage[] {
  return [
    { path: "/", views: 1842, avgTime: "1m 48s" },
    { path: "/services/website-design", views: 693, avgTime: "2m 05s" },
    { path: "/contact", views: 511, avgTime: "1m 12s" },
    { path: "/portfolio", views: 447, avgTime: "2m 31s" },
    { path: "/services/seo", views: 298, avgTime: "1m 57s" },
  ];
}
