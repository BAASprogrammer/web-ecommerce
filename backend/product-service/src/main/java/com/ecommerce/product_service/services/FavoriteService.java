package com.ecommerce.product_service.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.product_service.models.Favorite;
import com.ecommerce.product_service.models.Product;
import com.ecommerce.product_service.repositories.FavoriteRepository;
import com.ecommerce.product_service.repositories.ProductRepository;

@Service
public class FavoriteService {

	private final FavoriteRepository favoriteRepository;
	private final ProductRepository productRepository;

	public FavoriteService(FavoriteRepository favoriteRepository, ProductRepository productRepository) {
		this.favoriteRepository = favoriteRepository;
		this.productRepository = productRepository;
	}

	public List<Long> listProductIds(Long userId) {
		return favoriteRepository.findFavoriteProductIds(userId);
	}

	@Transactional
	public List<Long> toggle(Long userId, Long productId) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

		Favorite favorite = favoriteRepository.findByProductIdAndUserId(productId, userId)
				.orElseGet(() -> {
					Favorite created = new Favorite();
					created.setProduct(product);
					created.setUserId(userId);
					return created;
				});

		if (Boolean.TRUE.equals(favorite.getIsFavorite())) {
			favorite.setIsFavorite(false);
		} else {
			favorite.setIsFavorite(true);
		}
		favoriteRepository.save(favorite);

		return favoriteRepository.findFavoriteProductIds(userId);
	}

}