package com.ecommerce.aiservice.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

@Service
public class RagService {

    private final ChatClient chatClient;

    public RagService(ChatClient.Builder chatClientBuilder, VectorStore vectorStore) {
        this.chatClient = chatClientBuilder
                .defaultAdvisors(QuestionAnswerAdvisor.builder(vectorStore)
                        .searchRequest(SearchRequest.builder().topK(5).build())
                        .build())
                .defaultSystem("Eres un asistente virtual de una tienda de comercio electrónico. Responde amablemente a las preguntas basándote en la información de los productos proporcionada en el contexto. Si no sabes la respuesta o los productos no coinciden, di que no estás seguro y no inventes información.")
                .build();
    }

    public String chat(String query) {
        return chatClient.prompt()
                .user(query)
                .call()
                .content();
    }
}
