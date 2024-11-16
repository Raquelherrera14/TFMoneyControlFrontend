package com.upc.tf_moneycontrol.controller;

import com.upc.tf_moneycontrol.ServiceImplement.TransaccionesServiceImplement;
import com.upc.tf_moneycontrol.dto.TransaccionPeriodoDTO;
import com.upc.tf_moneycontrol.dto.TransaccionesDTO;
import com.upc.tf_moneycontrol.entities.Transacciones;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;



@RestController

@RequestMapping("/api/Transacciones")
public class TransaccionesController {
    @Autowired
    private TransaccionesServiceImplement transaccionesServiceImplement;


    @PostMapping("/TransaccionInsertar")
    @PreAuthorize("hasAnyAuthority('prestatario','Prestatario')")
    public TransaccionesDTO insertarHistoriaTransacciones(@RequestBody TransaccionesDTO transaccionesDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Transacciones transacciones = modelMapper.map(transaccionesDTO, Transacciones.class);
        transacciones = transaccionesServiceImplement.insertarPago(transacciones);
        return modelMapper.map(transacciones, TransaccionesDTO.class);
    }

    @GetMapping("/TransaccionesListar")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista') or hasAnyAuthority('prestatario','Prestatario') or hasAnyAuthority('administrador','Admin')")
    public List<TransaccionesDTO> listarHistorialTransacciones() {
        List<Transacciones> lista = transaccionesServiceImplement.listarTransacciones();
        ModelMapper modelMapper = new ModelMapper();
        List<TransaccionesDTO> listaDTO = modelMapper.map(lista , List.class);
        return listaDTO;
    }

    @PutMapping("/TransaccionModificar")
    @PreAuthorize("hasAnyAuthority('prestatario','Prestatario')")
    public TransaccionesDTO modificarHistorialTransacciones(@RequestBody TransaccionesDTO transaccionesDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Transacciones transacciones = modelMapper.map(transaccionesDTO, Transacciones.class);
        transacciones = transaccionesServiceImplement.modificarPago(transacciones);
        return modelMapper.map(transacciones, TransaccionesDTO.class);
    }

    @DeleteMapping("/TransaccionDelete")
    @PreAuthorize("hasAnyAuthority('prestatario','Prestatario')")
    public void eliminarHistorialTransacciones(@RequestBody TransaccionesDTO transaccionesDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Transacciones transacciones = modelMapper.map(transaccionesDTO, Transacciones.class);
        transaccionesServiceImplement.eliminarPago(transacciones.getIdTransacciones());
    }

    @GetMapping("/TransaccionPeriodo/{fechaInicio}/{fechaFin}")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista') or hasAnyAuthority('prestatario','Prestatario') or  hasAnyAuthority('administrador','admin')")
    public List<TransaccionPeriodoDTO> listarTransaccionesPorPeriodo(@PathVariable LocalDate fechaInicio, @PathVariable LocalDate fechaFin) {
        return transaccionesServiceImplement.listarTransaccionesPorPeriodo(fechaInicio, fechaFin);
    }


}
