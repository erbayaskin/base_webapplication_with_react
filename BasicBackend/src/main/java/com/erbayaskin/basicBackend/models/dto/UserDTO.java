package com.erbayaskin.basicBackend.models.dto;

import com.erbayaskin.basicBackend.models.entities.Role;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserDTO {
    private long id;
    private String email;
    private String username;
    private String password;
    private boolean enabled;
    private Collection<RoleDTO> roles;

}
