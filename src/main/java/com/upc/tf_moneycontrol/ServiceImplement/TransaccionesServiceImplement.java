package com.upc.tf_moneycontrol.ServiceImplement;


import com.upc.tf_moneycontrol.ServiceInterface.TransaccionesService;
import com.upc.tf_moneycontrol.dto.TransaccionPeriodoDTO;
import com.upc.tf_moneycontrol.entities.Transacciones;
import com.upc.tf_moneycontrol.repository.PrestamoRepository;
import com.upc.tf_moneycontrol.repository.TransaccionesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransaccionesServiceImplement implements TransaccionesService {
    @Autowired
    private TransaccionesRepository transaccionesRepository;
    private PrestamoRepository prestamoRepository;


    @Transactional
    @Override
    public Transacciones insertarPago(Transacciones transacciones) {
        return transaccionesRepository.save(transacciones);
    }



    @Override
    public void eliminarPago(Long id) {
        if(transaccionesRepository.existsById(id)) {
            transaccionesRepository.deleteById(id);
        }
    }

    @Override
    public Transacciones modificarPago(Transacciones transacciones) {
        if(transaccionesRepository.existsById(transacciones.getIdTransacciones())){
            return transaccionesRepository.save(transacciones);
        }
        return null;
    }

    @Override
    public List<Transacciones> listarTransacciones() {
        return transaccionesRepository.findAll();
    }

    @Override
    public List<TransaccionPeriodoDTO> listarTransaccionesPorPeriodo(LocalDate fechaInicio, LocalDate fechaFin) {
        return transaccionesRepository.listarTransaccionesPorPeriodo(fechaInicio, fechaFin);
    }


}
