import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {TreeSelectModule} from "primeng/treeselect";
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TreeNode} from 'primeng/api';
import {Usuario} from '../../model/usuario';
import { Rol } from '../../model/rol';
import {NavbarComponent} from "../navbar/navbar.component"; // Ajusta la ruta según la ubicación real de la clase Rol


@Component({
  selector: 'app-usuario',
  standalone: true,
    imports: [
        Button,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        TreeSelectModule,
        NavbarComponent
    ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {


  sesionForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  usuarioService: UsuarioService = inject(UsuarioService);
  router: Router = inject(Router);

  //EDICION
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.sesionForm = this.fb.group({
      idUsuario: [''],
      contrasena: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      enabled: [''],
      nombreRol: [''],


    })
  }

  selectedEstado: any;
  Estado: TreeNode[] = [

    {label: 'Activo', data: true, icon: 'pi pi-check', selectable: true},
    {label: 'Inactivo', data: false, icon: 'pi pi-times', selectable: true}

  ];

  selectedRol: any;
  Rol: TreeNode[] = [

    {label: 'Prestamista', data: 'Prestamista', icon: 'pi pi-wallet', selectable: true},
    {label: 'Prestatario', data: 'Prestatario', icon: 'pi pi-user', selectable: true},
    {label: 'Admin', data: 'Admin', icon: 'pi pi-users', selectable: true}

  ];


  ngOnInit() {
    this.route.params.subscribe((data) => {
      console.log("ngOnInit de IniciarSesionNuevoEditComponent");
      console.log(data);
      this.id = data['id'];
      this.edicion = this.id != null;
      this.cargaForm();

    });

  }

  private cargaForm() {
    if (this.edicion) {

      this.usuarioService.listId(this.id).subscribe((data: Usuario) => {

        console.log(data);
        this.sesionForm.patchValue({
          contrasena: data.contrasena,
          nombre: data.nombre,
          apellido: data.apellido,
          direccion: data.direccion,
          telefono: data.telefono,
          email: data.email,
          enabled: data.enabled,

          nombreRol: data.role.nombreRol,

        });
        this.selectedEstado = data.enabled;
        this.selectedRol = this.Rol.find(rol => rol.label === data.role.nombreRol);
      })
    }
  }

  onEstadoSelect(event: any) {
    this.sesionForm.patchValue({enabled: event.node.data});
  }

  onRolSelect(event: any) {
    this.sesionForm.patchValue({nombreRol: event.node.label});
  }

  onsubmit() {
    if (this.sesionForm.valid) {
      const usuario: Usuario = new Usuario();

      usuario.idUsuario = this.id;
      usuario.contrasena = this.sesionForm.value.contrasena
      usuario.nombre = this.sesionForm.value.nombre
      usuario.apellido = this.sesionForm.value.apellido
      usuario.direccion = this.sesionForm.value.direccion
      usuario.telefono = this.sesionForm.value.telefono
      usuario.email = this.sesionForm.value.email
      usuario.enabled = this.sesionForm.value.enabled

      usuario.role = new Rol(); // Crear una nueva instancia de Rol
      usuario.role.nombreRol = this.selectedRol.label; // Asigna el nombre del rol basado en la selección

      usuario.role.descripcion = '';


      if (!this.edicion) {
        this.usuarioService.insert(usuario).subscribe((data: Object): void => {
          this.usuarioService.list().subscribe(data => {
            this.usuarioService.setList(data);

          })

        })
      } else {
        console.log("Datos aceptdos", usuario);
        this.usuarioService.update(usuario).subscribe((data: Object): void => {
          this.usuarioService.list().subscribe(data => {
            this.usuarioService.setList(data);
          })
        });
      }
      this.router.navigate(['usuarios']);
      console.log("Formulario valido");

    } else {
      console.log("Formulario no valido");
      alert("Formulario no valido")
    }

  }
}

