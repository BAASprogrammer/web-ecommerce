package com.ecommerce.user_service.services;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.user_service.dto.AdminRegisterRequest;
import com.ecommerce.user_service.dto.LoginRequest;
import com.ecommerce.user_service.dto.RegisterRequest;
import com.ecommerce.user_service.models.User;
import com.ecommerce.user_service.repositories.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;

	@Value("${admin.registration-code}")
	private String adminRegistrationCode;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User register(RegisterRequest request) {
		String name = request.name() == null ? "" : request.name().trim();
		String email = request.email() == null ? "" : request.email().trim().toLowerCase();
		String password = request.password() == null ? "" : request.password();

		validateCommon(name, email, password);

		User user = new User();
		user.setName(name);
		user.setEmail(email);
		user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
		user.setRole("CLIENTE");
		user.setActive(true);

		return userRepository.save(user);
	}

	public User registerAdmin(AdminRegisterRequest request) {
		String code = request.code() == null ? "" : request.code().trim();
		if (!adminRegistrationCode.equals(code)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Código de administrador inválido");
		}

		String name = request.name() == null ? "" : request.name().trim();
		String email = request.email() == null ? "" : request.email().trim().toLowerCase();
		String password = request.password() == null ? "" : request.password();

		validateCommon(name, email, password);

		User user = new User();
		user.setName(name);
		user.setEmail(email);
		user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));
		user.setRole("ADMIN");
		user.setActive(true);

		return userRepository.save(user);
	}

	private void validateCommon(String name, String email, String password) {
		if (name.isEmpty()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El nombre es requerido");
		}
		if (!email.contains("@")) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email inválido");
		}
		if (password.length() < 8) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La contraseña debe tener al menos 8 caracteres");
		}
		if (userRepository.existsByEmailIgnoreCase(email)) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya está registrado");
		}
	}

	public User login(LoginRequest request) {
		String email = request.email() == null ? "" : request.email().trim().toLowerCase();
		String password = request.password() == null ? "" : request.password();

		User user = userRepository.findByEmailIgnoreCase(email)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));

		if (!BCrypt.checkpw(password, user.getPassword())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
		}
		if (Boolean.FALSE.equals(user.getActive())) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "La cuenta está desactivada");
		}

		return user;
	}

}
