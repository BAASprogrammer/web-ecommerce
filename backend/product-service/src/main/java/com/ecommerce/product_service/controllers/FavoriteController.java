package com.ecommerce.product_service.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.product_service.services.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

	private final FavoriteService favoriteService;

	public FavoriteController(FavoriteService favoriteService) {
		this.favoriteService = favoriteService;
	}

	@GetMapping("/{userId}")
	public List<Long> list(@PathVariable Long userId) {
		return favoriteService.listProductIds(userId);
	}

	@PutMapping("/{userId}/{productId}")
	public List<Long> toggle(@PathVariable Long userId, @PathVariable Long productId) {
		return favoriteService.toggle(userId, productId);
	}

}
