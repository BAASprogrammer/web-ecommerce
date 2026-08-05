package com.ecommerce.notification_service.dto;

import java.time.LocalDateTime;

public record ContactMessageItem(
		Long id,
		String name,
		String email,
		String subject,
		String message,
		LocalDateTime createdAt) {
}
