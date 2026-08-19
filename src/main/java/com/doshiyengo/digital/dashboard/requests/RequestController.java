package com.doshiyengo.digital.dashboard.requests;

import com.doshiyengo.digital.security.ClientPrincipal;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/dashboard/requests")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public String list(@RequestParam(name = "status", required = false) String status,
                        Model model,
                        @AuthenticationPrincipal ClientPrincipal principal) {
        populateListModel(model, principal, status, false);
        if (!model.containsAttribute("newRequestForm")) {
            model.addAttribute("newRequestForm", new CreateRequestForm());
        }
        return "dashboard/requests";
    }

    @PostMapping
    public String create(@Valid @ModelAttribute("newRequestForm") CreateRequestForm form,
                          BindingResult bindingResult,
                          Model model,
                          @AuthenticationPrincipal ClientPrincipal principal) {

        RequestCategory category = parseCategory(form.getCategory(), bindingResult);
        RequestPriority priority = parsePriority(form.getPriority(), bindingResult);

        if (bindingResult.hasErrors()) {
            populateListModel(model, principal, null, true);
            return "dashboard/requests";
        }

        requestService.createRequest(principal.getUsername(), form.getTitle(), form.getDescription(), category, priority);
        return "redirect:/dashboard/requests";
    }

    private RequestCategory parseCategory(String value, BindingResult bindingResult) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return RequestCategory.valueOf(value);
        } catch (IllegalArgumentException ex) {
            bindingResult.rejectValue("category", "invalid", "Please choose a valid category.");
            return null;
        }
    }

    private RequestPriority parsePriority(String value, BindingResult bindingResult) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return RequestPriority.valueOf(value);
        } catch (IllegalArgumentException ex) {
            bindingResult.rejectValue("priority", "invalid", "Please choose a valid priority.");
            return null;
        }
    }

    private void populateListModel(Model model, ClientPrincipal principal, String statusParam, boolean openForm) {
        RequestStatus filter = parseStatus(statusParam);

        model.addAttribute("activeNav", "requests");
        model.addAttribute("businessName", principal.getBusinessName());
        model.addAttribute("pageTitle", "Requests — Doshi and Yengo Digital");
        model.addAttribute("sectionTitle", "Requests");
        model.addAttribute("categories", RequestCategory.values());
        model.addAttribute("priorities", RequestPriority.values());
        model.addAttribute("statuses", RequestStatus.values());
        model.addAttribute("activeStatus", filter == null ? "ALL" : filter.name());
        model.addAttribute("openForm", openForm);
        model.addAttribute("requests", requestService.getRequestsForUser(principal.getUsername(), filter));
    }

    private RequestStatus parseStatus(String statusParam) {
        if (statusParam == null || statusParam.isBlank() || "ALL".equalsIgnoreCase(statusParam)) {
            return null;
        }
        try {
            return RequestStatus.valueOf(statusParam);
        } catch (IllegalArgumentException ex) {
            return null;
        }
    }
}
