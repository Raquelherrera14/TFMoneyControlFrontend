package com.upc.tf_moneycontrol.controller;


import com.upc.tf_moneycontrol.ServiceImplement.UsuarioServiceImplement;
import com.upc.tf_moneycontrol.dto.ListarUsuariosRolDTO;
import com.upc.tf_moneycontrol.dto.UsuarioDTO;
import com.upc.tf_moneycontrol.entities.Usuario;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;



@RestController

@RequestMapping("/api/Usuario")
public class UsuarioController {
    @Autowired
    private UsuarioServiceImplement usuarioServiceImplement;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/UsuarioRegistrar")
    public UsuarioDTO insertar(@RequestBody UsuarioDTO usuarioDTO){
        ModelMapper modelMapper= new ModelMapper();
        Usuario usuario= modelMapper.map(usuarioDTO, Usuario.class);
        String passwordEncriptada = passwordEncoder.encode(usuario.getContrasena());
        usuario.setContrasena(passwordEncriptada);
        usuario= usuarioServiceImplement.savedUsuario(usuario);
        return modelMapper.map(usuario, UsuarioDTO.class);

    }
    @GetMapping("/UsuarioListar")
    public List<UsuarioDTO> list(){
        return usuarioServiceImplement.list().stream().map(y -> {
            ModelMapper modelMapper= new ModelMapper();
            return  modelMapper.map(y, UsuarioDTO.class);
        }).collect(Collectors.toList());
    }

    @PutMapping("/UsuarioModificar")
    public UsuarioDTO modificarUsuraio(@RequestBody UsuarioDTO usuarioDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Usuario usuario = modelMapper.map(usuarioDTO, Usuario.class);
        usuario = usuarioServiceImplement.modificarUsuario(usuario);
        return modelMapper.map(usuario, UsuarioDTO.class);
    }

    @DeleteMapping("/UsuraioDelete/{idUsuario}")
    public void eliminarUsuraio(@PathVariable Long idUsuario) {
        ModelMapper modelMapper = new ModelMapper();
        usuarioServiceImplement.eliminarUsuario(idUsuario);
    }

    @GetMapping("/ListarUsuarioPorRol/{idRol}")
    public List<ListarUsuariosRolDTO> listarUsuarioPorRol(@PathVariable Long idRol){
        return usuarioServiceImplement.listarUsuarioPorRol(idRol);
    }

}
