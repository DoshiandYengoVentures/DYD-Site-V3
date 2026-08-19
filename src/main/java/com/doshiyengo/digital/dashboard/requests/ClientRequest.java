package com.doshiyengo.digital.dashboard.requests;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

public class ClientRequest {

    private static final DateTimeFormatter DISPLAY_FORMAT = DateTimeFormatter.ofPattern("MMM d, yyyy");

    private final String id;
    private final String username;
    private final String title;
    private final String description;
    private final RequestCategory category;
    private final RequestPriority priority;
    private final LocalDateTime submittedAt;
    private RequestStatus status;

    public ClientRequest(String username, String title, String description,
                          RequestCategory category, RequestPriority priority) {
        this.id = UUID.randomUUID().toString();
        this.username = username;
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.submittedAt = LocalDateTime.now();
        this.status = RequestStatus.SUBMITTED;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public RequestCategory getCategory() {
        return category;
    }

    public RequestPriority getPriority() {
        return priority;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public String getSubmittedAtDisplay() {
        return submittedAt.format(DISPLAY_FORMAT);
    }

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }
}
