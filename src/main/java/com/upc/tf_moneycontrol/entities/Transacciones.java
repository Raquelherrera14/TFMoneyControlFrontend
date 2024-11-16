package com.upc.tf_moneycontrol.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Transacciones {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTransacciones;
    private BigDecimal montoTransaccion;
    private LocalDate fechaTransaccion;
    private String tipoTransaccion;
    private String descripcion;
    private String metodoPago;
    private String estadoTransaccion;
    @ManyToOne
    @JoinColumn(name = "prestamo_prestamo_id")
    private Prestamo prestamo;

}