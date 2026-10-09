package com.ecommerce.aiservice.controller;

import com.ecommerce.aiservice.dto.ProductDto;
import com.ecommerce.aiservice.service.SemanticSearchService;
import org.springframework.ai.document.Document;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// Endpoints REST del ai-service
@RestController
@RequestMapping("/api/ai")
public class SearchController {

    private final SemanticSearchService searchService;

    public SearchController(SemanticSearchService searchService) {
        this.searchService = searchService;
    }

    // POST /api/ai/index -> recibe una lista de productos y los guarda como vectores
    @PostMapping("/index")
    public Map<String, Object> index(@RequestBody List<ProductDto> products) {
        int total = searchService.indexProducts(products);
        return Map.of("indexed", total);
    }

    // GET /api/ai/search?q=...&topK=5 -> devuelve los productos más parecidos a la consulta
    @GetMapping("/search")
    public List<Map<String, Object>> search(@RequestParam("q") String query,
                                            @RequestParam(value = "topK", defaultValue = "5") int topK) {
        return searchService.search(query, topK).stream()
                .map(this::toResult)
                .toList();
    }

    // Convierte un Document en un resultado simple para el frontend
    private Map<String, Object> toResult(Document doc) {
        return Map.of(
                "productId", doc.getMetadata().get("productId"),
                "name", doc.getMetadata().get("name"),
                "category", doc.getMetadata().get("category"),
                "text", doc.getText()
        );
    }
}
