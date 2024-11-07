package com.erbayaskin.basicBackend.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommonResponse {
    private int status;
    private Object data;
    private String message;
}