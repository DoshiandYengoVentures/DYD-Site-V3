package com.doshiyengo.digital.dashboard.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateRequestForm {

    @NotBlank(message = "Please enter a title.")
    @Size(max = 140, message = "Title must be 140 characters or fewer.")
    private String title;

    @NotBlank(message = "Please add a description.")
    @Size(max = 4000, message = "Description must be 4000 characters or fewer.")
    private String description;

    @NotBlank(message = "Please choose a category.")
    private String category;

    @NotBlank(message = "Please choose a priority.")
    private String priority;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
