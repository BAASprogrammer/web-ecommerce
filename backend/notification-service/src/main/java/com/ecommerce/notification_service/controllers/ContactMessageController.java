package com.ecommerce.notification_service.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.notification_service.dto.ContactMessageItem;
import com.ecommerce.notification_service.dto.ContactMessageRequest;
import com.ecommerce.notification_service.dto.ContactMessageResponse;
import com.ecommerce.notification_service.models.ContactMessage;
import com.ecommerce.notification_service.services.ContactMessageService;

@RestController
@RequestMapping("/api/contact-messages")
public class ContactMessageController {

	private final ContactMessageService contactMessageService;

	public ContactMessageController(ContactMessageService contactMessageService) {
		this.contactMessageService = contactMessageService;
	}

	@GetMapping
	public ResponseEntity<List<ContactMessageItem>> list() {
		List<ContactMessageItem> messages = contactMessageService.listAll().stream()
				.map(m -> new ContactMessageItem(
						m.getId(),
						m.getName(),
						m.getEmail(),
						m.getSubject(),
						m.getMessage(),
						m.getCreatedAt()))
				.toList();
		return ResponseEntity.ok(messages);
	}

	@PostMapping
	public ResponseEntity<ContactMessageResponse> create(@RequestBody ContactMessageRequest request) {
		ContactMessage contactMessage = contactMessageService.save(request);
		ContactMessageResponse response = new ContactMessageResponse(
				contactMessage.getId(),
				contactMessage.getName(),
				contactMessage.getEmail(),
				contactMessage.getSubject());
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

}
