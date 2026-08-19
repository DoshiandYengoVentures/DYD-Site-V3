package com.doshiyengo.digital.controller;

import com.doshiyengo.digital.model.ContactRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ContactController {

    private static final Logger log = LoggerFactory.getLogger(ContactController.class);

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("activePage", "contact");
        model.addAttribute("pageTitle", "Contact — Doshi and Yengo Digital");
        if (!model.containsAttribute("contactRequest")) {
            model.addAttribute("contactRequest", new ContactRequest());
        }
        return "contact";
    }

    @PostMapping("/contact")
    public String submitContact(@Valid @ModelAttribute("contactRequest") ContactRequest contactRequest,
                                 BindingResult bindingResult,
                                 Model model,
                                 RedirectAttributes redirectAttributes) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("activePage", "contact");
            model.addAttribute("pageTitle", "Contact — Doshi and Yengo Digital");
            return "contact";
        }

        log.info("New contact form submission — name: {}, email: {}, phone: {}, message: {}",
                contactRequest.getName(),
                contactRequest.getEmail(),
                contactRequest.getPhone(),
                contactRequest.getMessage());

        redirectAttributes.addFlashAttribute("submitted", true);
        return "redirect:/contact";
    }
}
