package com.upc.tf_moneycontrol.ServiceInterface;



import com.upc.tf_moneycontrol.dto.EstadisticasPrestamoDTO;
import com.upc.tf_moneycontrol.dto.ListarPrestamosUsuarioDTO;
import com.upc.tf_moneycontrol.dto.PagoCorrespondienteDTO;
import com.upc.tf_moneycontrol.dto.PrestamoPeriodoDTO;
import com.upc.tf_moneycontrol.entities.Prestamo;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PrestamoService {
    public Prestamo insertarPrestamo(Prestamo prestamo);
    public void eliminarPrestamo(Long id);
    public Prestamo modificarPrestamo(Prestamo prestamo);
    public List<Prestamo> listarPrestamo();

    public List<ListarPrestamosUsuarioDTO> listarPrestamosUsuarioPorRol();

    public List<PagoCorrespondienteDTO> ObtenerPagoCorrespondiente(Long prestamoId);

    public List<PrestamoPeriodoDTO> listarPrestamosPorPeriodo(@Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

    public List<EstadisticasPrestamoDTO> calcularEstadisticasPrestamos();
}
