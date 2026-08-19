package com.doshiyengo.digital.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ServicesController {

    @GetMapping("/services/website-design")
    public String websiteDesign(Model model) {
        model.addAttribute("activePage", "website-design");
        model.addAttribute("pageTitle", "Website Design — Doshi and Yengo Digital");
        return "services/website-design";
    }

    @GetMapping("/services/business-automation")
    public String businessAutomation(Model model) {
        model.addAttribute("activePage", "business-automation");
        model.addAttribute("pageTitle", "Business Automation — Doshi and Yengo Digital");
        return "services/business-automation";
    }

    @GetMapping("/services/ai-solutions")
    public String aiSolutions(Model model) {
        model.addAttribute("activePage", "ai-solutions");
        model.addAttribute("pageTitle", "AI Solutions — Doshi and Yengo Digital");
        return "services/ai-solutions";
    }

    @GetMapping("/services/seo")
    public String seo(Model model) {
        model.addAttribute("activePage", "seo");
        model.addAttribute("pageTitle", "SEO — Doshi and Yengo Digital");
        return "services/seo";
    }
}
