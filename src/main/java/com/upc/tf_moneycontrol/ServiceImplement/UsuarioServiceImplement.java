package com.upc.tf_moneycontrol.ServiceImplement;


import com.upc.tf_moneycontrol.ServiceInterface.UsuarioService;
import com.upc.tf_moneycontrol.dto.ListarUsuariosRolDTO;
import com.upc.tf_moneycontrol.entities.Usuario;
import com.upc.tf_moneycontrol.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UsuarioServiceImplement implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Transactional
    @Override
    public Usuario savedUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public void eliminarUsuario(Long id) {
        if(usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
        }
    }

    @Override
    public Usuario modificarUsuario(Usuario usuario) {
        if(usuarioRepository.existsById(usuario.getIdUsuario())){
            return usuarioRepository.save(usuario);
        }
        return null;
    }

    @Override
    public List<Usuario> list() {
        return usuarioRepository.findAll();
    }

    @Override
    public List<ListarUsuariosRolDTO> listarUsuarioPorRol(Long idRol) {
        return usuarioRepository.listarUsuarioPorRol(idRol);
    }
}
