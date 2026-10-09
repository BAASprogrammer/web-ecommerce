package com.ecommerce.product_service.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.product_service.models.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

	Optional<Favorite> findByProductIdAndUserId(Long productId, Long userId);

	@Query("SELECT f.product.id FROM Favorite f WHERE f.userId = :userId AND f.isFavorite = true ORDER BY f.product.id ASC")
	List<Long> findFavoriteProductIds(@Param("userId") Long userId);

	void deleteByProductId(Long productId);

}
