package com.doshiyengo.digital.dashboard;

import com.doshiyengo.digital.dashboard.model.ActivityItem;
import com.doshiyengo.digital.dashboard.model.NotificationItem;
import com.doshiyengo.digital.dashboard.model.ServiceStatus;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Mock data for the client dashboard, keyed by username so a real, per-client
 * data source can replace this later without touching any controller or template.
 */
@Service
public class DashboardDataService {

    public List<ServiceStatus> getServiceStatuses(String username) {
        return List.of(
                new ServiceStatus("Website", "harborandco-demo.com", "Active", "db-badge-active"),
                new ServiceStatus("SEO", "Local + technical SEO", "In Progress", "db-badge-progress"),
                new ServiceStatus("Business Automation", "Booking & follow-up workflows", "Active", "db-badge-active"),
                new ServiceStatus("AI Solutions", "Site chat assistant", "Needs Attention", "db-badge-attention")
        );
    }

    public List<NotificationItem> getNotifications(String username) {
        return List.of(
                new NotificationItem("Your website update has been published.", "2 hours ago", true),
                new NotificationItem("New message from your account manager.", "1 day ago", true),
                new NotificationItem("Your monthly SEO report is ready to view.", "3 days ago", false),
                new NotificationItem("Invoice #1042 has been paid.", "5 days ago", false)
        );
    }

    public List<ActivityItem> getRecentActivity(String username) {
        return List.of(
                new ActivityItem("Website updated — homepage copy revised", "Today, 10:14 AM"),
                new ActivityItem("New message received from the Doshi and Yengo team", "Yesterday, 3:45 PM"),
                new ActivityItem("Invoice #1042 paid", "Aug 15, 2026"),
                new ActivityItem("Monthly SEO report generated", "Aug 12, 2026"),
                new ActivityItem("Automation workflow \"Appointment Reminders\" activated", "Aug 8, 2026")
        );
    }
}
