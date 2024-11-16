package com.upc.tf_moneycontrol.ServiceImplement;


import com.upc.tf_moneycontrol.ServiceInterface.RolService;
import com.upc.tf_moneycontrol.entities.Role;
import com.upc.tf_moneycontrol.repository.RolRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImplement implements RolService {
    @Autowired
    private RolRepository rolRepository;
    @Transactional
    @Override
    public Role insertarrol(Role role) {
        return rolRepository.save(role);
    }

    @Override
    public void eliminarrol(Long id) {
        if(rolRepository.existsById(id))
        {
            rolRepository.deleteById(id);
        }

    }

    @Override
    public Role modificarrol(Role role) {
        if(rolRepository.existsById(role.getIdRol()))
        {
            return rolRepository.save(role);
        }
        return null;
    }

    @Override
    public List<Role> listarrol() {
        return rolRepository.findAll();
    }
}
