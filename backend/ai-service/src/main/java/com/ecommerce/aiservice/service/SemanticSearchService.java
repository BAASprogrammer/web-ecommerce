package com.ecommerce.aiservice.service;

import com.ecommerce.aiservice.dto.ProductDto;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

// Servicio que indexa productos en pgvector y los busca por significado (búsqueda semántica)
@Service
public class SemanticSearchService {

    // VectorStore lo configura Spring AI automáticamente (pgvector + modelo de embeddings de Ollama)
    private final VectorStore vectorStore;

    public SemanticSearchService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    // Convierte cada producto en un Document; Spring AI genera el embedding al guardarlo
    public int indexProducts(List<ProductDto> products) {
        List<Document> documents = products.stream()
                .map(p -> new Document(
                        // El id debe ser un UUID válido en la tabla vector_store, así que lo derivamos del id del producto
                        java.util.UUID.nameUUIDFromBytes(("product-" + p.id()).getBytes()).toString(),
                        // Texto que se convierte en vector: nombre + categoría + descripción
                        p.name() + ". " + p.category() + ". " + p.description(),
                        // Metadata: sirve para devolver el producto original en los resultados
                        Map.of("productId", p.id(), "name", p.name(), "category", p.category())))
                .toList();

        vectorStore.add(documents);
        return documents.size();
    }

    // Busca los productos más parecidos en significado a la consulta del usuario
    public List<Document> search(String query, int topK) {
        return vectorStore.similaritySearch(
                SearchRequest.builder()
                        .query(query)   // Texto de búsqueda, ej: "zapatillas cómodas para caminar"
                        .topK(topK)     // Cantidad máxima de resultados
                        .build());
    }
}
