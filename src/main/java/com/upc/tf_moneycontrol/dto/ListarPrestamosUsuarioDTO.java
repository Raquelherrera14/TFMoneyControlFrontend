package com.upc.tf_moneycontrol.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class ListarPrestamosUsuarioDTO {

    private Long idUsuario;
    private String nombreUsuario;
    private String rolUsuario;
    private Long cantidadPrestamos;
    private BigDecimal montoTotalPrestamos;

}
