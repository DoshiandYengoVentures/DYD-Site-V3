package com.doshiyengo.digital.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("activePage", "home");
        model.addAttribute("pageTitle", "Doshi and Yengo Digital — Web Design, SEO, AI & Automation");
        return "home";
    }
}
