package com.upc.tf_moneycontrol.ServiceImplement;


import com.upc.tf_moneycontrol.ServiceInterface.PrestamoService;
import com.upc.tf_moneycontrol.dto.EstadisticasPrestamoDTO;
import com.upc.tf_moneycontrol.dto.ListarPrestamosUsuarioDTO;
import com.upc.tf_moneycontrol.dto.PagoCorrespondienteDTO;
import com.upc.tf_moneycontrol.dto.PrestamoPeriodoDTO;
import com.upc.tf_moneycontrol.entities.Prestamo;
import com.upc.tf_moneycontrol.repository.PrestamoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PrestamoServiceImplement implements PrestamoService {
    @Autowired
    private PrestamoRepository prestamoRepository;
    @Transactional
    @Override
    public Prestamo insertarPrestamo(Prestamo prestamo) {
        return prestamoRepository.save(prestamo);
    }

    @Override
    public void eliminarPrestamo(Long id) {
        if(prestamoRepository.existsById(id)) {
            prestamoRepository.deleteById(id);
        }

    }

    @Override
    public Prestamo modificarPrestamo(Prestamo prestamo) {
        if(prestamoRepository.existsById(prestamo.getIdPrestamo())){
            return prestamoRepository.save(prestamo);
        }
        return null;
    }

    @Override
    public List<Prestamo> listarPrestamo() {
        return prestamoRepository.findAll();
    }

    @Override
    public List<ListarPrestamosUsuarioDTO> listarPrestamosUsuarioPorRol() {
        return prestamoRepository.listarPrestamosUsuarioPorRol();
    }

    @Override
    public List<PagoCorrespondienteDTO> ObtenerPagoCorrespondiente(Long prestamoId) {
        return prestamoRepository.ObtenerPagoCorrespondiente(prestamoId);
    }

    @Override
    public List<PrestamoPeriodoDTO> listarPrestamosPorPeriodo(LocalDate fechaInicio, LocalDate fechaFin) {
        return prestamoRepository.listarPrestamosPorPeriodo(fechaInicio, fechaFin);
    }

    @Override
    public List<EstadisticasPrestamoDTO> calcularEstadisticasPrestamos() {
        return prestamoRepository.calcularEstadisticasPrestamos();
    }
}
