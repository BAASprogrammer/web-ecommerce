package com.ecommerce.product_service.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.product_service.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	List<Category> findAllByOrderByIdAsc();

	Optional<Category> findByNameIgnoreCase(String name);

}
