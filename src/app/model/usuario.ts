import {Rol} from './rol';

export class Usuario {
  idUsuario: number=0;
  contrasena: string;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono : string;
  email: string;
  enabled : boolean;
  role: Rol;
  //private Long idUsuario;
  //
  //     private String contrasena;
  //     private String nombre;
  //     private String apellido;
  //     private String direccion;
  //     private String telefono;
  //     private String email;
  //
  //     private boolean enabled;
  //     @ManyToOne(fetch = FetchType.EAGER)
  //     @JoinColumn(name = "rol_roles_id")
  //     private Rol rol;
}
