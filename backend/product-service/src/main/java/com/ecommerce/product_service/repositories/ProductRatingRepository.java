package com.ecommerce.product_service.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ecommerce.product_service.models.ProductRating;

public interface ProductRatingRepository extends JpaRepository<ProductRating, Long> {

	List<ProductRating> findAllByProductId(Long productId);

	@Query("SELECT r.product.id, AVG(r.stars), COUNT(r) FROM ProductRating r GROUP BY r.product.id")
	List<Object[]> findRatingSummary();

	void deleteByProductId(Long productId);

}
