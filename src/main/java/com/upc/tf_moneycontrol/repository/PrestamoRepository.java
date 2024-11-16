package com.upc.tf_moneycontrol.repository;


import com.upc.tf_moneycontrol.dto.EstadisticasPrestamoDTO;
import com.upc.tf_moneycontrol.dto.ListarPrestamosUsuarioDTO;
import com.upc.tf_moneycontrol.dto.PagoCorrespondienteDTO;
import com.upc.tf_moneycontrol.dto.PrestamoPeriodoDTO;
import com.upc.tf_moneycontrol.entities.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PrestamoRepository extends JpaRepository<Prestamo,Long> {

    @Query("select new com.upc.tf_moneycontrol.dto.ListarPrestamosUsuarioDTO(u.idUsuario, u.nombre, u.role.nombreRol, COUNT(p), SUM(p.monto)) " +
            "FROM Prestamo p " +
            "JOIN p.usuario u " +
            "GROUP BY u.idUsuario, u.nombre, u.role.nombreRol")
    public List<ListarPrestamosUsuarioDTO> listarPrestamosUsuarioPorRol();


    @Query("select new com.upc.tf_moneycontrol.dto.PagoCorrespondienteDTO(t.idPrestamo,t.monto" +
            ",t.tasaInteres,t.fechaFin) from Prestamo t WHERE t.idPrestamo = :prestamoId")

    public List<PagoCorrespondienteDTO> ObtenerPagoCorrespondiente(@Param("prestamoId") Long prestamoId);

    @Query("select new com.upc.tf_moneycontrol.dto.PrestamoPeriodoDTO(u.idUsuario, u.nombre, p.idPrestamo, p.monto, p.fechaInicio, " +
            "p.fechaFin, p.estado) FROM Prestamo p JOIN p.usuario u WHERE p.fechaInicio BETWEEN :fechaInicio AND :fechaFin")
    public List<PrestamoPeriodoDTO> listarPrestamosPorPeriodo(@Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

    @Query("select new com.upc.tf_moneycontrol.dto.EstadisticasPrestamoDTO(AVG(p.monto), SUM(p.monto), COUNT(p)) FROM Prestamo p")
    public List<EstadisticasPrestamoDTO> calcularEstadisticasPrestamos();
}
