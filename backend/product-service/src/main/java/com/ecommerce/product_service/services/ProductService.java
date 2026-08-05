package com.ecommerce.product_service.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.product_service.dto.ProductItem;
import com.ecommerce.product_service.dto.ProductRequest;
import com.ecommerce.product_service.models.Category;
import com.ecommerce.product_service.models.Product;
import com.ecommerce.product_service.repositories.CategoryRepository;
import com.ecommerce.product_service.repositories.ProductRatingRepository;
import com.ecommerce.product_service.repositories.ProductRepository;

@Service
public class ProductService {

	private final ProductRepository productRepository;
	private final CategoryRepository categoryRepository;
	private final ProductRatingRepository productRatingRepository;
	private final CatalogSeeder catalogSeeder;

	public ProductService(ProductRepository productRepository,
			CategoryRepository categoryRepository,
			ProductRatingRepository productRatingRepository,
			CatalogSeeder catalogSeeder) {
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
		this.productRatingRepository = productRatingRepository;
		this.catalogSeeder = catalogSeeder;
	}

	public List<ProductItem> listAll() {
		Map<Long, double[]> summary = ratingSummary();
		return productRepository.findAllByOrderByIdAsc().stream()
				.map(p -> toItem(p, summary))
				.toList();
	}

	public ProductItem get(Long id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
		return toItem(product, ratingSummary());
	}

	@Transactional
	public ProductItem create(ProductRequest request) {
		String name = trim(request.name());
		if (name.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es requerido");
		}
		if (trim(request.description()).isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La descripción es requerida");
		}
		if (request.price() == null || request.price().compareTo(BigDecimal.ZERO) <= 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio debe ser mayor a 0");
		}

		Product product = new Product();
		product.setName(name);
		applyFields(product, request);
		product.setCategory(resolveCategory(request.category()));

		Product saved = productRepository.save(product);
		return toItem(saved, ratingSummary());
	}

	@Transactional
	public ProductItem update(Long id, ProductRequest request) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

		String name = trim(request.name());
		if (name.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es requerido");
		}
		if (trim(request.description()).isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La descripción es requerida");
		}
		if (request.price() == null || request.price().compareTo(BigDecimal.ZERO) <= 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El precio debe ser mayor a 0");
		}

		product.setName(name);
		applyFields(product, request);
		product.setCategory(resolveCategory(request.category()));

		Product saved = productRepository.save(product);
		return toItem(saved, ratingSummary());
	}

	@Transactional
	public void delete(Long id) {
		if (!productRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
		}
		productRatingRepository.deleteByProductId(id);
		productRepository.deleteById(id);
	}

	@Transactional
	public List<ProductItem> reset() {
		productRatingRepository.deleteAll();
		productRepository.deleteAll();
		categoryRepository.deleteAll();
		catalogSeeder.seedIfEmpty();
		return listAll();
	}

	private void applyFields(Product product, ProductRequest request) {
		product.setPrice(request.price());
		product.setOriginalPrice(request.originalPrice());
		product.setStock(request.stock() != null ? request.stock() : 0);
		product.setImage(trim(request.image()));
		product.setBadge(trim(request.badge()));
		product.setBadgeColor(trim(request.badgeColor()));
		product.setDescription(trim(request.description()));
	}

	private Category resolveCategory(String categoryName) {
		String name = trim(categoryName);
		if (name.isEmpty()) {
			return null;
		}
		return categoryRepository.findByNameIgnoreCase(name)
				.orElseGet(() -> {
					Category category = new Category();
					category.setName(name);
					return categoryRepository.save(category);
				});
	}

	private Map<Long, double[]> ratingSummary() {
		return productRatingRepository.findRatingSummary().stream()
				.collect(Collectors.toMap(
						row -> (Long) row[0],
						row -> new double[] { ((Number) row[1]).doubleValue(), ((Number) row[2]).doubleValue() }));
	}

	private ProductItem toItem(Product p, Map<Long, double[]> summary) {
		double[] agg = summary.get(p.getId());
		double rating = agg == null ? 0.0 : Math.round(agg[0] * 10.0) / 10.0;
		long reviews = agg == null ? 0L : (long) agg[1];
		return new ProductItem(
				p.getId(),
				p.getName(),
				p.getDescription(),
				p.getPrice(),
				p.getOriginalPrice(),
				p.getStock(),
				p.getImage(),
				p.getBadge(),
				p.getBadgeColor(),
				p.getCategory() != null ? p.getCategory().getName() : null,
				rating,
				reviews);
	}

	private String trim(String value) {
		return value == null ? "" : value.trim();
	}

}
