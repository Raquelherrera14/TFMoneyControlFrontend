package com.upc.tf_moneycontrol.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class EstadisticasPrestamoDTO {

    private Double promedioMonto;
    private BigDecimal totalMonto;
    private Long cantidadPrestamos;


}
