package com.doshiyengo.digital.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PortfolioController {

    @GetMapping("/portfolio")
    public String portfolio(Model model) {
        model.addAttribute("activePage", "portfolio");
        model.addAttribute("pageTitle", "Portfolio — Doshi and Yengo Digital");
        return "portfolio";
    }
}
