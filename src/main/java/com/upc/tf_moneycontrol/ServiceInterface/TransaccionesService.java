package com.upc.tf_moneycontrol.ServiceInterface;



import com.upc.tf_moneycontrol.dto.TransaccionPeriodoDTO;
import com.upc.tf_moneycontrol.entities.Transacciones;

import java.time.LocalDate;
import java.util.List;

public interface TransaccionesService {

    public Transacciones insertarPago(Transacciones transacciones);
    public void eliminarPago(Long id);
    public Transacciones modificarPago(Transacciones transacciones);
    public List<Transacciones> listarTransacciones();

    public List<TransaccionPeriodoDTO> listarTransaccionesPorPeriodo(LocalDate fechaInicio, LocalDate fechaFin);



}
