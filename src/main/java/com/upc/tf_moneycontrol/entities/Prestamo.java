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

public class Prestamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPrestamo;
    private BigDecimal monto;
    private BigDecimal tasaInteres;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estado;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_user_id")
    private Usuario usuario;
}