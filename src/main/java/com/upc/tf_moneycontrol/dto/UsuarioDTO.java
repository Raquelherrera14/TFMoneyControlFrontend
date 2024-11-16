package com.upc.tf_moneycontrol.dto;


import com.upc.tf_moneycontrol.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Long idUsuario;
    private String contrasena;
    private String nombre;
    private String apellido;
    private String direccion;
    private String telefono;
    private String email;

    private boolean enabled;

    private Role role;


}
