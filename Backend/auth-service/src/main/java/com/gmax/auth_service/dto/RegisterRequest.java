package com.gmax.auth_service.dto;

import com.gmax.auth_service.model.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
