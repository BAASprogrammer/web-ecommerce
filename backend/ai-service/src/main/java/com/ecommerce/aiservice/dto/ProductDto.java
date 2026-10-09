package com.ecommerce.aiservice.dto;

// DTO con los datos mínimos de un producto que necesitamos para generar su embedding.
// Los campos coinciden con los de tu product-service (ajústalos si los tuyos se llaman distinto).
public record ProductDto(
        Long id,
        String name,
        String description,
        String category
) {
}
