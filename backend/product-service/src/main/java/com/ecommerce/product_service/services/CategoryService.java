package com.ecommerce.product_service.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.product_service.dto.CategoryItem;
import com.ecommerce.product_service.dto.CategoryRequest;
import com.ecommerce.product_service.models.Category;
import com.ecommerce.product_service.repositories.CategoryRepository;
import com.ecommerce.product_service.repositories.ProductRepository;

@Service
public class CategoryService {

	private final CategoryRepository categoryRepository;
	private final ProductRepository productRepository;
	private final CatalogSeeder catalogSeeder;

	public CategoryService(CategoryRepository categoryRepository,
			ProductRepository productRepository,
			CatalogSeeder catalogSeeder) {
		this.categoryRepository = categoryRepository;
		this.productRepository = productRepository;
		this.catalogSeeder = catalogSeeder;
	}

	public List<CategoryItem> listAll() {
		return categoryRepository.findAllByOrderByIdAsc().stream()
				.map(c -> toItem(c))
				.toList();
	}

	@Transactional
	public CategoryItem create(CategoryRequest request) {
		String name = cleanName(request.name());
		if (name.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es requerido");
		}
		if (categoryRepository.findByNameIgnoreCase(name).isPresent()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "La categoría ya existe");
		}
		Category category = new Category();
		category.setName(name);
		category.setDescription(clean(request.description()));
		return toItem(categoryRepository.save(category));
	}

	@Transactional
	public CategoryItem update(Long id, CategoryRequest request) {
		Category category = categoryRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

		String name = cleanName(request.name());
		if (name.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es requerido");
		}
		Optional<Category> existing = categoryRepository.findByNameIgnoreCase(name);
		if (existing.isPresent() && !existing.get().getId().equals(id)) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "La categoría ya existe");
		}

		category.setName(name);
		category.setDescription(clean(request.description()));
		return toItem(categoryRepository.save(category));
	}

	@Transactional
	public void delete(Long id) {
		if (!categoryRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
		}
		productRepository.clearCategory(id);
		categoryRepository.deleteById(id);
	}

	@Transactional
	public List<CategoryItem> reset() {
		productRepository.clearAllCategories();
		categoryRepository.deleteAll();
		catalogSeeder.seedCategoriesIfEmpty();
		return listAll();
	}

	private CategoryItem toItem(Category category) {
		return new CategoryItem(category.getId(), category.getName(), category.getDescription());
	}

	private String cleanName(String value) {
		return clean(value);
	}

	private String clean(String value) {
		return value == null ? "" : value.trim();
	}

}
