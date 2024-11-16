package com.upc.tf_moneycontrol.security.dtos;


public class AuthResponseDTO {
    private final String jwt;

    public AuthResponseDTO(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

}