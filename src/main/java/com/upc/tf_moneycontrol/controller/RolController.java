package com.upc.tf_moneycontrol.controller;


import com.upc.tf_moneycontrol.ServiceImplement.RolServiceImplement;
import com.upc.tf_moneycontrol.dto.RolDTO;
import com.upc.tf_moneycontrol.entities.Role;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController

@RequestMapping("/api/Rol")
public class RolController {
    @Autowired
    private RolServiceImplement rolServiceImplement;
    @PostMapping("/rolInsertar")
    public RolDTO insertarRol(@RequestBody RolDTO rolDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Role role = modelMapper.map(rolDTO, Role.class);

        role = rolServiceImplement.insertarrol(role);
        return modelMapper.map(role, RolDTO.class);
    }

    @GetMapping("/rolListar")
    public List<RolDTO> listarRol() {
        List<Role> lista = rolServiceImplement.listarrol();
        ModelMapper modelMapper = new ModelMapper();
        List<RolDTO> listaDTO = modelMapper.map(lista , List.class);
        return listaDTO;
    }

    @PutMapping("/rolModificar")
    public RolDTO modificarRol(@RequestBody RolDTO rolDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Role role = modelMapper.map(rolDTO, Role.class);
        role = rolServiceImplement.modificarrol(role);
        return modelMapper.map(role, RolDTO.class);
    }

    @DeleteMapping("/rolDelete")
    public void eliminarRol(@RequestBody RolDTO rolDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Role role = modelMapper.map(rolDTO, Role.class);
        rolServiceImplement.eliminarrol(role.getIdRol());
    }
}
