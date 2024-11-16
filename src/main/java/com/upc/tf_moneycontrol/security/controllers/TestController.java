package com.upc.tf_moneycontrol.security.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "${ip.frontend}")
@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/prestamista")
    @PreAuthorize("hasAnyRole('prestamista', 'Prestamista','PRESTAMISTA')")
    public String prestamistaEndpoint() {return "This is the prestamista endpoint, accessible only to users with ADMIN role.";}

    @GetMapping("/prestatario")
    @PreAuthorize("hasAnyRole('prestatario', 'Prestatario','PRESTATARIO')")
    public String prestatarioEndpoint() {
        return "This is the prestatario endpoint, accessible to users with USER or ADMIN role.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAnyRole('admin', 'Admin','ADMIN')")
    public String adminEndpoint() {
        return "This is the admin endpoint, accessible to users with USER or ADMIN role.";
    }

}
