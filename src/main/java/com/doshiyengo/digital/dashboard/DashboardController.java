package com.doshiyengo.digital.dashboard;

import com.doshiyengo.digital.security.ClientPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Controller
@RequestMapping("/dashboard")
public class DashboardController {

    private static final DateTimeFormatter TODAY_FORMAT = DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy");

    private final DashboardDataService dashboardDataService;

    public DashboardController(DashboardDataService dashboardDataService) {
        this.dashboardDataService = dashboardDataService;
    }

    @GetMapping
    public String dashboard(Model model, @AuthenticationPrincipal ClientPrincipal principal) {
        addShellAttributes(model, principal, "dashboard");
        model.addAttribute("pageTitle", "Dashboard — Doshi and Yengo Digital");
        model.addAttribute("sectionTitle", "Dashboard");
        model.addAttribute("today", LocalDate.now().format(TODAY_FORMAT));
        model.addAttribute("services", dashboardDataService.getServiceStatuses(principal.getUsername()));
        model.addAttribute("notifications", dashboardDataService.getNotifications(principal.getUsername()));
        model.addAttribute("activity", dashboardDataService.getRecentActivity(principal.getUsername()));
        return "dashboard/index";
    }

    @GetMapping("/website")
    public String website(Model model, @AuthenticationPrincipal ClientPrincipal principal) {
        return placeholder(model, principal, "website", "My Website",
                "This is where you'll manage your website content, pages, and site settings.");
    }

    @GetMapping("/services")
    public String services(Model model, @AuthenticationPrincipal ClientPrincipal principal) {
        return placeholder(model, principal, "services", "Services",
                "This is where you'll view and manage the services active on your account.");
    }

    @GetMapping("/requests")
    public String requests(Model model, @AuthenticationPrincipal ClientPrincipal principal) {
        return placeholder(model, principal, "requests", "Requests",
                "This is where you'll submit and track change requests for your projects.");
    }

    @GetMapping("/messages")
    public String messages(Model model, @AuthenticationPrincipal ClientPrincipal principal) {
        return placeholder(model, principal, "messages", "Messages",
                "This is where you'll message your Doshi and Yengo Digital team directly.");
    }

    @GetMapping("/analytics")
    public String analytics(Model model, @AuthenticationPrincipal ClientPrincipal principal) {
        return placeholder(model, principal, "analytics", "Analytics",
                "This is where you'll see traffic, ranking, and conversion analytics for your website.");
    }

    @GetMapping("/account")
    public String account(Model model, @AuthenticationPrincipal ClientPrincipal principal) {
        return placeholder(model, principal, "account", "Account",
                "This is where you'll manage your business profile, billing, and login details.");
    }

    private String placeholder(Model model, ClientPrincipal principal, String navKey, String title, String description) {
        addShellAttributes(model, principal, navKey);
        model.addAttribute("pageTitle", title + " — Doshi and Yengo Digital");
        model.addAttribute("sectionTitle", title);
        model.addAttribute("sectionDescription", description);
        return "dashboard/placeholder";
    }

    private void addShellAttributes(Model model, ClientPrincipal principal, String activeNav) {
        model.addAttribute("activeNav", activeNav);
        model.addAttribute("businessName", principal.getBusinessName());
    }
}
