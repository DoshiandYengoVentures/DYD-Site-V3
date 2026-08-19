package com.doshiyengo.digital.dashboard.requests;

public enum RequestStatus {
    SUBMITTED("Submitted", "db-badge-status-submitted"),
    IN_PROGRESS("In Progress", "db-badge-status-progress"),
    WAITING_FOR_CLIENT("Waiting for Client", "db-badge-status-waiting"),
    COMPLETED("Completed", "db-badge-status-completed");

    private final String label;
    private final String badgeClass;

    RequestStatus(String label, String badgeClass) {
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
