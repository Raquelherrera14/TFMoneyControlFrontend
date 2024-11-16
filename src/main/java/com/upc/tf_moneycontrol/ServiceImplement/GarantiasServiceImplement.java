package com.upc.tf_moneycontrol.ServiceImplement;

import com.upc.tf_moneycontrol.ServiceInterface.GarantiasService;
import com.upc.tf_moneycontrol.entities.Garantia;
import com.upc.tf_moneycontrol.repository.GarantiasRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarantiasServiceImplement implements GarantiasService {
    @Autowired
    private GarantiasRepository garantiasRepository;
    @Transactional
    @Override
    public Garantia insertarGarantia(Garantia garantia) {
        return garantiasRepository.save(garantia);
    }

    @Override
    public void eliminarGarantia(Long id) {
        if(garantiasRepository.existsById(id)) {
            garantiasRepository.deleteById(id);
        }
    }

    @Override
    public Garantia modificarGarantia(Garantia garantia) {

        if(garantiasRepository.existsById(garantia.getIdGarantia())){
            return garantiasRepository.save(garantia);
        }
        return null;
    }

    @Override
    public List<Garantia> listarGarantia() {
        return garantiasRepository.findAll();
    }
}
