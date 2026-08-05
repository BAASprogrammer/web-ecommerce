package com.ecommerce.notification_service.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.notification_service.models.ContactMessage;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

	List<ContactMessage> findAllByOrderByCreatedAtDesc();

}
