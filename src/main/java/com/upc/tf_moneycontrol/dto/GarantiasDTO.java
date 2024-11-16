package com.upc.tf_moneycontrol.dto;


import com.upc.tf_moneycontrol.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GarantiasDTO {
    private Long idGarantia;
    private String tipoGarantia;
    private String descripcion;
    private BigDecimal valorGarantia;
    private Usuario usuario;
}
