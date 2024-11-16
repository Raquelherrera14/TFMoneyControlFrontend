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
public class TransaccionPeriodoDTO {

    private Long idUsuario;
    private String nombreUsuario;
    private Long idTransaccion;
    private BigDecimal montoTransaccion;
    private LocalDate fechaTransaccion;
    private String estadoTransaccion;
}
