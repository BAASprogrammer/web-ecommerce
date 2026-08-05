package com.ecommerce.notification_service.dto;

public record ContactMessageRequest(String name, String email, String subject, String message) {
}
