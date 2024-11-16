package com.upc.tf_moneycontrol.ServiceInterface;



import com.upc.tf_moneycontrol.dto.ListarUsuariosRolDTO;
import com.upc.tf_moneycontrol.entities.Usuario;

import java.util.List;

public interface UsuarioService {
    public Usuario savedUsuario(Usuario usuario);
    public void eliminarUsuario(Long  id);
    public Usuario modificarUsuario(Usuario usuario);
    public List<Usuario> list();

    List<ListarUsuariosRolDTO> listarUsuarioPorRol(Long idRol);
}
