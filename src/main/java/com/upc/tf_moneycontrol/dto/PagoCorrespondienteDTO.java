package com.upc.tf_moneycontrol.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter


public class PagoCorrespondienteDTO {

    private Long PrestamoId;
    private BigDecimal montoPrestamo;
    private BigDecimal tasaInteres;
    private BigDecimal montoTotalaPagar;
    private LocalDate FechaMaximaDePago;

    public PagoCorrespondienteDTO(Long prestamoId, BigDecimal montoPrestamo, BigDecimal tasaInteres, LocalDate fechaMaximaDePago) {
        this.PrestamoId = prestamoId;
        this.montoPrestamo = montoPrestamo;
        this.tasaInteres = tasaInteres;
        this.montoTotalaPagar = montoPrestamo.multiply(tasaInteres).add(montoPrestamo);
        this.FechaMaximaDePago = fechaMaximaDePago;
    }

}
