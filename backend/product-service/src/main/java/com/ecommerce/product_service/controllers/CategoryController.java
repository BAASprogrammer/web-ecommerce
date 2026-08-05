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

import com.ecommerce.product_service.dto.CategoryItem;
import com.ecommerce.product_service.dto.CategoryRequest;
import com.ecommerce.product_service.services.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	private final CategoryService categoryService;

	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	@GetMapping
	public List<CategoryItem> list() {
		return categoryService.listAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CategoryItem create(@RequestBody CategoryRequest request) {
		return categoryService.create(request);
	}

	@PutMapping("/{id}")
	public CategoryItem update(@PathVariable Long id, @RequestBody CategoryRequest request) {
		return categoryService.update(id, request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		categoryService.delete(id);
	}

	@PostMapping("/reset")
	public List<CategoryItem> reset() {
		return categoryService.reset();
	}

}
