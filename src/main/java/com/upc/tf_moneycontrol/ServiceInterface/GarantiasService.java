package com.upc.tf_moneycontrol.ServiceInterface;



import com.upc.tf_moneycontrol.entities.Garantia;

import java.util.List;

public interface GarantiasService {

    public Garantia insertarGarantia(Garantia garantia);
    public void eliminarGarantia(Long id);
    public Garantia modificarGarantia(Garantia garantia);
    public List<Garantia> listarGarantia();


}
