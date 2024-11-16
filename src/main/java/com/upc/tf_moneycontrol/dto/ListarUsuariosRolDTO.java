package com.upc.tf_moneycontrol.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ListarUsuariosRolDTO {

    private Long idUsuario;
    private String nombre;
    private String email;
    private String telefono;
    private Long idRol;
    private String nombrerol;
}
