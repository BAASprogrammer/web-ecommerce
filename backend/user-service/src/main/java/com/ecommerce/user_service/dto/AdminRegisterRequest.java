package com.ecommerce.user_service.dto;

public record AdminRegisterRequest(String name, String email, String password, String code) {
}
