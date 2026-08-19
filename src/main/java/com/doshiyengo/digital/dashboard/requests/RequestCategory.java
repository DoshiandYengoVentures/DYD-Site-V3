package com.doshiyengo.digital.dashboard.requests;

public enum RequestCategory {
    WEBSITE_DESIGN("Website Design"),
    AUTOMATION("Automation"),
    AI_SOLUTIONS("AI Solutions"),
    SEO("SEO"),
    OTHER("Other");

    private final String label;

    RequestCategory(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
