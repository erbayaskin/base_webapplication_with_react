package com.erbayaskin.basicBackend.models.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

@Data
public class RoleDTO {
    private long id;
    private String role_name;
}
