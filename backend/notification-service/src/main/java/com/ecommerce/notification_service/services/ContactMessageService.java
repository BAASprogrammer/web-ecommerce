package com.ecommerce.notification_service.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.notification_service.dto.ContactMessageRequest;
import com.ecommerce.notification_service.models.ContactMessage;
import com.ecommerce.notification_service.repositories.ContactMessageRepository;

@Service
public class ContactMessageService {

	private final ContactMessageRepository contactMessageRepository;

	public ContactMessageService(ContactMessageRepository contactMessageRepository) {
		this.contactMessageRepository = contactMessageRepository;
	}

	public List<ContactMessage> listAll() {
		return contactMessageRepository.findAllByOrderByCreatedAtDesc();
	}

	public ContactMessage save(ContactMessageRequest request) {
		String name = request.name() == null ? "" : request.name().trim();
		String email = request.email() == null ? "" : request.email().trim().toLowerCase();
		String subject = request.subject() == null ? "" : request.subject().trim();
		String message = request.message() == null ? "" : request.message().trim();

		if (name.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es requerido");
		}
		if (!email.contains("@")) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email inválido");
		}
		if (subject.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El asunto es requerido");
		}
		if (message.length() < 10) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El mensaje debe tener al menos 10 caracteres");
		}

		ContactMessage contactMessage = new ContactMessage();
		contactMessage.setName(name);
		contactMessage.setEmail(email);
		contactMessage.setSubject(subject);
		contactMessage.setMessage(message);

		return contactMessageRepository.save(contactMessage);
	}

}
