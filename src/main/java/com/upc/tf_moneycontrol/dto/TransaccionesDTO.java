package com.upc.tf_moneycontrol.dto;

import com.upc.tf_moneycontrol.entities.Prestamo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TransaccionesDTO {
    private Long idTransacciones;
    private BigDecimal montoTransaccion;
    private LocalDate fechaTransaccion;
    private String tipoTransaccion;
    private String descripcion;
    private String metodoPago;
    private String estadoTransaccion;
    private Prestamo prestamo;


}
