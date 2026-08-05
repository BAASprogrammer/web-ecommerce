package com.ecommerce.product_service.dto;

import java.math.BigDecimal;

public record ProductItem(
		Long id,
		String name,
		String description,
		BigDecimal price,
		BigDecimal originalPrice,
		int stock,
		String image,
		String badge,
		String badgeColor,
		String category,
		double rating,
		long reviews) {
}
