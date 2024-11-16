package com.upc.tf_moneycontrol.controller;


import com.upc.tf_moneycontrol.ServiceImplement.GarantiasServiceImplement;
import com.upc.tf_moneycontrol.dto.GarantiasDTO;
import com.upc.tf_moneycontrol.entities.Garantia;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController

@RequestMapping("/api/Garantias")
public class GarantiasController {

    @Autowired
    private GarantiasServiceImplement garantiaServicioImplement;
    @PostMapping("/garantiaInsertar")
    @PreAuthorize("hasAnyAuthority('prestatario','Prestatario')")
    public GarantiasDTO insertarGarantia(@RequestBody GarantiasDTO garantiaDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Garantia garantia = modelMapper.map(garantiaDTO, Garantia.class);

        garantia = garantiaServicioImplement.insertarGarantia(garantia);
        return modelMapper.map(garantia, GarantiasDTO.class);
    }

    @GetMapping("/garantiaListar")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista') or hasAnyAuthority('prestatario','Prestatario') or hasAnyAuthority('administrador','admin')")
    public List<GarantiasDTO> listarGarantia() {
        List<Garantia> lista = garantiaServicioImplement.listarGarantia();
        ModelMapper modelMapper = new ModelMapper();
        List<GarantiasDTO> listaDTO = modelMapper.map(lista , List.class);
        return listaDTO;
    }

    @PutMapping("/garantiaModicar")
    @PreAuthorize("hasAnyAuthority('prestatario','Prestatario')")
    public GarantiasDTO modificarGarantia(@RequestBody GarantiasDTO garantiaDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Garantia garantia = modelMapper.map(garantiaDTO, Garantia.class);
        garantia = garantiaServicioImplement.modificarGarantia(garantia);
        return modelMapper.map(garantia, GarantiasDTO.class);
    }

    @DeleteMapping("/garantiaDelete/{idGarantia}")
    @PreAuthorize("hasAnyAuthority('prestamista','Prestamista') or hasAnyAuthority('administrador','Admin')")
    public void eliminarGarantia(@PathVariable Long idGarantia) {
        ModelMapper modelMapper = new ModelMapper();
        garantiaServicioImplement.eliminarGarantia(idGarantia);
    }
}
