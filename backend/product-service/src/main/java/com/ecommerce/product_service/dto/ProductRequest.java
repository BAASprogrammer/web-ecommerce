package com.ecommerce.product_service.dto;

import java.math.BigDecimal;

public record ProductRequest(
		String name,
		String description,
		BigDecimal price,
		BigDecimal originalPrice,
		Integer stock,
		String image,
		String badge,
		String badgeColor,
		String category) {
}
