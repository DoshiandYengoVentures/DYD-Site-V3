package com.doshiyengo.digital.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AboutController {

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("activePage", "about");
        model.addAttribute("pageTitle", "About — Doshi and Yengo Digital");
        return "about";
    }
}
