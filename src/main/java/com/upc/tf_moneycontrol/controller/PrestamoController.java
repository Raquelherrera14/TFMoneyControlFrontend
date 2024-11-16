package com.upc.tf_moneycontrol.controller;


import com.upc.tf_moneycontrol.ServiceImplement.PrestamoServiceImplement;
import com.upc.tf_moneycontrol.dto.*;
import com.upc.tf_moneycontrol.entities.Prestamo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;



@RestController

@RequestMapping("/api/Prestamo")
public class PrestamoController {
    @Autowired
    private PrestamoServiceImplement prestamoServicioImplement;

    @PostMapping("/prestamo")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista')")
    public PrestamoDTO insertarPrestamo(@RequestBody PrestamoDTO prestamoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Prestamo prestamo = modelMapper.map(prestamoDTO, Prestamo.class);
        prestamo = prestamoServicioImplement.insertarPrestamo(prestamo);
        return modelMapper.map(prestamo, PrestamoDTO.class);
    }

    @GetMapping("/prestamoList")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista') or hasAnyAuthority('prestatario','Prestatario')")
    public List<PrestamoDTO> listarPrestamo() {
        List<Prestamo> lista = prestamoServicioImplement.listarPrestamo();
        ModelMapper modelMapper = new ModelMapper();
        List<PrestamoDTO> listaDTO = modelMapper.map(lista , List.class);
        return listaDTO;
    }

    @PutMapping("/prestamoModifi")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista')")
    public PrestamoDTO modificarPrestamo(@RequestBody PrestamoDTO prestamoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Prestamo prestamo = modelMapper.map(prestamoDTO, Prestamo.class);
        prestamo = prestamoServicioImplement.modificarPrestamo(prestamo);
        return modelMapper.map(prestamo, PrestamoDTO.class);
    }

    @DeleteMapping("/prestamoDelete")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista')")
    public void eliminarPrestamo(@RequestBody PrestamoDTO prestamoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Prestamo prestamo = modelMapper.map(prestamoDTO, Prestamo.class);
        prestamoServicioImplement.eliminarPrestamo(prestamo.getIdPrestamo());
    }

    @GetMapping("/ListarPrestamosUsuarios")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista') or hasAnyAuthority('administrador','admin')")
    public List<ListarPrestamosUsuarioDTO> listarPrestamosUsuarioPorRol() {
        return prestamoServicioImplement.listarPrestamosUsuarioPorRol();
    }

    @GetMapping("/CalcularMonto/{prestamoId}")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista') or hasAnyAuthority('prestatario','Prestatario')")
    public List<PagoCorrespondienteDTO> obtenerPagoCalculado(@PathVariable Long prestamoId) {

        return prestamoServicioImplement.ObtenerPagoCorrespondiente(prestamoId);
    }

    @GetMapping("/PrestamosPeriodo/{fechaInicio}/{fechaFin}")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista') or hasAnyAuthority('prestatario','Prestatario') or hasAnyAuthority('administrador','Admin')")
    public List<PrestamoPeriodoDTO> listarPrestamosPorPeriodo(@PathVariable LocalDate fechaInicio, @PathVariable LocalDate fechaFin){
        return prestamoServicioImplement.listarPrestamosPorPeriodo(fechaInicio, fechaFin);
    }

    @GetMapping("/PrestamosEstadisticas")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista') or hasAnyAuthority('prestatario','Prestatario') or hasAnyAuthority('administrador','Admin')")
    public List<EstadisticasPrestamoDTO> calcularEstadisticasPrestamos() {
        return prestamoServicioImplement.calcularEstadisticasPrestamos();
    }

}
