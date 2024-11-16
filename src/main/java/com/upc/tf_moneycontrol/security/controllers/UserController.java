package com.upc.tf_moneycontrol.security.controllers;


import com.upc.tf_moneycontrol.security.entities.User;
import com.upc.tf_moneycontrol.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${ip.frontend}")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder bcrypt;

    @PostMapping("/user")
    @PreAuthorize("hasRole('ADMIN')")
    public void createUser(@RequestBody User user) {
        String bcryptPassword = bcrypt.encode(user.getContrasena());
        user.setContrasena(bcryptPassword);
        userService.save(user);
    }

    @PostMapping("/save/{user_id}/{rol_id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Integer> saveUseRol(@PathVariable("user_id") Long user_id,
                                              @PathVariable("role_id") Long role_id){
        return new ResponseEntity<Integer>(userService.insertUserRol(user_id, role_id), HttpStatus.OK);
        //return new ResponseEntity<Integer>(uService.insertUserRol2(user_id, role_id),HttpStatus.OK);
    }
}
