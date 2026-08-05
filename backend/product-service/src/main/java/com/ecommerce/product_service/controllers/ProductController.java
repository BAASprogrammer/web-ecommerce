package com.ecommerce.product_service.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.product_service.dto.ProductItem;
import com.ecommerce.product_service.dto.ProductRequest;
import com.ecommerce.product_service.services.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@GetMapping
	public List<ProductItem> list() {
		return productService.listAll();
	}

	@GetMapping("/{id}")
	public ProductItem get(@PathVariable Long id) {
		return productService.get(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ProductItem create(@RequestBody ProductRequest request) {
		return productService.create(request);
	}

	@PutMapping("/{id}")
	public ProductItem update(@PathVariable Long id, @RequestBody ProductRequest request) {
		return productService.update(id, request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		productService.delete(id);
	}

	@PostMapping("/reset")
	public List<ProductItem> reset() {
		return productService.reset();
	}

}
