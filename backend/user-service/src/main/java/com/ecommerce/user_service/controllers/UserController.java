package com.ecommerce.user_service.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.user_service.dto.AdminRegisterRequest;
import com.ecommerce.user_service.dto.LoginRequest;
import com.ecommerce.user_service.dto.LoginResponse;
import com.ecommerce.user_service.dto.RegisterRequest;
import com.ecommerce.user_service.dto.RegisterResponse;
import com.ecommerce.user_service.models.User;
import com.ecommerce.user_service.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/register")
	public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
		User user = userService.register(request);
		RegisterResponse response = new RegisterResponse(
				user.getId(),
				user.getName(),
				user.getEmail(),
				user.getRole());
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PostMapping("/register-admin")
	public ResponseEntity<RegisterResponse> registerAdmin(@RequestBody AdminRegisterRequest request) {
		User user = userService.registerAdmin(request);
		RegisterResponse response = new RegisterResponse(
				user.getId(),
				user.getName(),
				user.getEmail(),
				user.getRole());
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
		User user = userService.login(request);
		LoginResponse response = new LoginResponse(
				user.getId(),
				user.getName(),
				user.getEmail(),
				user.getRole());
		return ResponseEntity.ok(response);
	}

}
