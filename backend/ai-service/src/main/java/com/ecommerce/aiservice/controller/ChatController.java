package com.ecommerce.aiservice.controller;

import com.ecommerce.aiservice.service.RagService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class ChatController {

    private final RagService ragService;

    public ChatController(RagService ragService) {
        this.ragService = ragService;
    }

    @GetMapping("/chat")
    public Map<String, String> chat(@RequestParam("q") String query) {
        String answer = ragService.chat(query);
        return Map.of("answer", answer);
    }
}
