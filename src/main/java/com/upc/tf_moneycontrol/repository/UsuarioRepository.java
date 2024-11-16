package com.upc.tf_moneycontrol.repository;


import com.upc.tf_moneycontrol.dto.ListarUsuariosRolDTO;
import com.upc.tf_moneycontrol.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {


    @Query("SELECT new com.upc.tf_moneycontrol.dto.ListarUsuariosRolDTO(u.idUsuario, u.nombre,u.email,u.telefono,u.role.idRol," +
            "u.role.nombreRol) FROM Usuario u WHERE u.role.idRol = :idRol")
    public List<ListarUsuariosRolDTO> listarUsuarioPorRol(@Param("idRol") Long idRol);

    public Usuario findByEmail(String email);

}
