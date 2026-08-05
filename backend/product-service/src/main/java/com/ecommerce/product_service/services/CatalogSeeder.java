package com.ecommerce.product_service.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.product_service.models.Category;
import com.ecommerce.product_service.models.Product;
import com.ecommerce.product_service.models.ProductRating;
import com.ecommerce.product_service.repositories.CategoryRepository;
import com.ecommerce.product_service.repositories.ProductRatingRepository;
import com.ecommerce.product_service.repositories.ProductRepository;

@Service
public class CatalogSeeder {

	private final CategoryRepository categoryRepository;
	private final ProductRepository productRepository;
	private final ProductRatingRepository productRatingRepository;

	public CatalogSeeder(CategoryRepository categoryRepository,
			ProductRepository productRepository,
			ProductRatingRepository productRatingRepository) {
		this.categoryRepository = categoryRepository;
		this.productRepository = productRepository;
		this.productRatingRepository = productRatingRepository;
	}

	public void seedIfEmpty() {
		seedCategoriesIfEmpty();
		seedProductsIfEmpty();
		seedRatingsIfEmpty();
	}

	public void seedCategoriesIfEmpty() {
		if (categoryRepository.count() > 0) {
			return;
		}
		for (String name : List.of("Electrónica", "Deporte", "Tecnología", "Accesorios")) {
			Category category = new Category();
			category.setName(name);
			categoryRepository.save(category);
		}
	}

	public void seedProductsIfEmpty() {
		if (productRepository.count() > 0) {
			return;
		}
		Category electronica = categoryByName("Electrónica");
		Category deporte = categoryByName("Deporte");
		Category tecnologia = categoryByName("Tecnología");
		Category accesorios = categoryByName("Accesorios");

		seedProduct("Audífonos Inalámbricos Pro", "Auriculares con cancelación activa de ruido, 40 horas de batería y sonido envolvente de alta fidelidad.", "59990", "89990", 0, "/product-headphones.png",
				"Más Vendido", "#4F46E5", electronica);
		seedProduct("Zapatillas Running Air", "Zapatillas ligeras con amortiguación de retorno de energía, ideales para entrenar y correr a diario.", "79990", "99990", 0, "/product-shoes.png",
				"Nuevo", "#10B981", deporte);
		seedProduct("Smartwatch Series X", "Reloj inteligente con pantalla AMOLED, monitor de frecuencia cardíaca, GPS y resistencia al agua.", "129990", "169990", 0, "/product-watch.png",
				"Top Rated", "#10B981", tecnologia);
		seedProduct("Mochila Urban Pro", "Mochila compacta con compartimento acolchado para laptop de 15\", puerto USB y tejido impermeable.", "39990", null, 0, "/product-backpack.png",
				null, null, accesorios);
		seedProduct("Audífonos Studio", "Auriculares sobre la oreja con graves potentes, micrófono integrado y plegables para llevar a todas partes.", "34990", "49990", 0, "/product-headphones.png",
				null, null, electronica);
		seedProduct("Smartwatch Lite", "Smartwatch económico con notificaciones, control de sueño, 12 modos deportivos y hasta 10 días de batería.", "69990", "89990", 0, "/product-watch.png",
				"Oferta", "#EF4444", tecnologia);
		seedProduct("Zapatillas Trail", "Calzado con suela de agarre reforzado y protección antideslizante para rutas de montaña y tierra.", "89990", null, 0, "/product-shoes.png",
				"Nuevo", "#10B981", deporte);
		seedProduct("Mochila Travel 40L", "Mochila de viaje de 40 litros con apertura tipo maleta, correas de compresión y bolsillos organizadores.", "54990", "69990", 0, "/product-backpack.png",
				null, null, accesorios);
	}

	public void seedRatingsIfEmpty() {
		if (productRatingRepository.count() > 0) {
			return;
		}
		long userId = 1L;
		for (Product product : productRepository.findAllByOrderByIdAsc()) {
			int[] stars = starsFor(product.getName());
			for (int star : stars) {
				ProductRating rating = new ProductRating();
				rating.setProduct(product);
				rating.setUserId(userId++);
				rating.setStars((short) star);
				productRatingRepository.save(rating);
			}
		}
	}

	private Product seedProduct(String name, String description, String price, String originalPrice, int stock,
			String image, String badge, String badgeColor, Category category) {
		Product product = new Product();
		product.setName(name);
		product.setDescription(description);
		product.setPrice(new BigDecimal(price));
		product.setOriginalPrice(originalPrice != null ? new BigDecimal(originalPrice) : null);
		product.setStock(stock);
		product.setImage(image);
		product.setBadge(badge);
		product.setBadgeColor(badgeColor);
		product.setCategory(category);
		return productRepository.save(product);
	}

	private Category categoryByName(String name) {
		return categoryRepository.findByNameIgnoreCase(name).orElse(null);
	}

	private int[] starsFor(String name) {
		return switch (name) {
			case "Audífonos Inalámbricos Pro" -> new int[] { 5, 5, 5, 5, 4 };
			case "Zapatillas Running Air" -> new int[] { 5, 4, 5, 5, 4 };
			case "Smartwatch Series X" -> new int[] { 5, 5, 5, 5, 5, 5, 5, 5, 5, 4 };
			case "Mochila Urban Pro" -> new int[] { 5, 4 };
			case "Audífonos Studio" -> new int[] { 5, 4, 4, 4, 4, 5, 4, 4, 5, 4 };
			case "Smartwatch Lite" -> new int[] { 5, 4, 4, 4, 5 };
			case "Zapatillas Trail" -> new int[] { 5, 4, 5, 5, 4, 5 };
			case "Mochila Travel 40L" -> new int[] { 5, 5, 4, 5 };
			default -> new int[] { 4 };
		};
	}

}
