package com.doshiyengo.digital.dashboard.requests;

public enum RequestPriority {
    LOW("Low", "db-badge-priority-low"),
    MEDIUM("Medium", "db-badge-priority-medium"),
    HIGH("High", "db-badge-priority-high");

    private final String label;
    private final String badgeClass;

    RequestPriority(String label, String badgeClass) {
        this.label = label;
        this.badgeClass = badgeClass;
    }

    public String getLabel() {
        return label;
    }

    public String getBadgeClass() {
        return badgeClass;
    }
}
