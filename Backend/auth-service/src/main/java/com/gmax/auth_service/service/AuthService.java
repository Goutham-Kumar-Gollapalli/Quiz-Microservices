package com.gmax.auth_service.service;

import com.gmax.auth_service.dto.AuthResponse;
import com.gmax.auth_service.dto.LoginRequest;
import com.gmax.auth_service.dto.RegisterRequest;
import com.gmax.auth_service.model.Role;
import com.gmax.auth_service.model.UserAccount;
import com.gmax.auth_service.repository.UserRepository;
import com.gmax.auth_service.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (request.getName() == null || request.getName().isBlank()
                || request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name, email, and a password of at least 8 characters are required.");
        }
        if (request.getRole() != Role.STUDENT && request.getRole() != Role.TEACHER) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose Student or Teacher.");
        }
        String email = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account with this email already exists.");
        }

        UserAccount user = new UserAccount();
        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        userRepository.save(user);
        return toResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required.");
        }
        UserAccount user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password."));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password.");
        }
        return toResponse(user);
    }

    private AuthResponse toResponse(UserAccount user) {
        return new AuthResponse(jwtService.generateToken(user), user.getName(), user.getEmail(), user.getRole());
    }
}
