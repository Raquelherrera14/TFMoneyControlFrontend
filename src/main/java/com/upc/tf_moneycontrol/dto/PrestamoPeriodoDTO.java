package com.upc.tf_moneycontrol.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class PrestamoPeriodoDTO {

    private Long idUsuario;
    private String nombreUsuario;
    private Long idPrestamo;
    private BigDecimal montoPrestamo;
    private LocalDate fechaInicioPrestamo;
    private LocalDate fechaFinPrestamo;
    private String estadoPrestamo;
}
