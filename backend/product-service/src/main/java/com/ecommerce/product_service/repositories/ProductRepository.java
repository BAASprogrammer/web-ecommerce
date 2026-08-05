package com.ecommerce.product_service.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.product_service.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findAllByOrderByIdAsc();

	Optional<Product> findByNameIgnoreCase(String name);

	@Modifying
	@Query("UPDATE Product p SET p.category = NULL WHERE p.category.id = :categoryId")
	void clearCategory(@Param("categoryId") Long categoryId);

	@Modifying
	@Query("UPDATE Product p SET p.category = NULL")
	void clearAllCategories();

}
