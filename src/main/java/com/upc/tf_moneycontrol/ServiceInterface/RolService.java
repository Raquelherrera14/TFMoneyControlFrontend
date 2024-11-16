package com.upc.tf_moneycontrol.ServiceInterface;


import com.upc.tf_moneycontrol.entities.Role;

import java.util.List;

public interface RolService {
    public Role insertarrol(Role role);
    public void eliminarrol(Long id);
    public Role modificarrol(Role usuario);
    public List<Role> listarrol();



}
