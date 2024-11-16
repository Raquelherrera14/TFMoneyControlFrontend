package com.upc.tf_moneycontrol.repository;


import com.upc.tf_moneycontrol.dto.TransaccionPeriodoDTO;
import com.upc.tf_moneycontrol.entities.Transacciones;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TransaccionesRepository extends JpaRepository<Transacciones,Long> {

    @Query("SELECT new com.upc.tf_moneycontrol.dto.TransaccionPeriodoDTO(u.idUsuario, u.nombre, t.idTransacciones, t.montoTransaccion, " +
            "t.fechaTransaccion, t.estadoTransaccion) " +
            "FROM Transacciones t JOIN t.prestamo p JOIN p.usuario u WHERE t.fechaTransaccion BETWEEN :fechaInicio AND :fechaFin")

    public List<TransaccionPeriodoDTO> listarTransaccionesPorPeriodo(@Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

}
