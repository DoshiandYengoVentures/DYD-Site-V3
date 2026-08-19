package com.doshiyengo.digital.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Please enter your name.")
    private String name;

    @NotBlank(message = "Please enter your email.")
    @Email(message = "Please enter a valid email address.")
    private String email;

    private String phone;

    @NotBlank(message = "Please tell us a bit about your project.")
    @Size(max = 2000, message = "Message is too long.")
    private String message;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
