import {Component, inject} from '@angular/core';
import {Button, ButtonDirective} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TreeSelectModule} from 'primeng/treeselect';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Rol} from '../../../model/rol';
import {TreeNode} from 'primeng/api';
import {UsuarioService} from '../../../services/usuario.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Usuario} from '../../../model/usuario';
import {NavbarComponent} from '../../navbar/navbar.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-iniciarsesion-nuevo-edit',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    TreeSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
    ButtonDirective,
    MatButton,
    RouterLink
  ],
  templateUrl: './iniciarsesion-nuevo-edit.component.html',
  styleUrl: './iniciarsesion-nuevo-edit.component.css'
})
export class IniciarsesionNuevoEditComponent {
  idRol: number =1;
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
      contrasena: ['',Validators.required],
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      direccion: ['',Validators.required],
      telefono : ['',Validators.required],
      email: ['',Validators.required],
      enabled : [true],
      nombreRol: [''],




    });
  }

  selectedEstado: any;
  Estado: TreeNode[] = [

    { label: 'Activo', data: true,icon: 'pi pi-check', selectable: true },
    { label: 'Inactivo', data: false,icon: 'pi pi-times', selectable: true}

  ];

  selectedRol: any;
  Rol: TreeNode[] =[

    { label: 'Prestamista', data: { idRol: 1, nombreRol: 'Prestamista' }, icon: 'pi pi-wallet', selectable: true },
    { label: 'Prestatario', data: { idRol: 2, nombreRol: 'Prestatario' }, icon: 'pi pi-user', selectable: true },
    { label: 'Admin', data: { idRol: 3, nombreRol: 'Admin' }, icon: 'pi pi-users', selectable: true }

  ];


  ngOnInit() {
      this.route.params.subscribe((data) => {
    console.log("ngOnInit de IniciarSesionNuevoEditComponent");
    console.log(data);
    this.id= data['id'];
    this.edicion = data['id'] != null;
    this.cargaForm();

    });

  }

  private cargaForm() {
    if(this.edicion){

      this.usuarioService.listId(this.id).subscribe((data:Usuario) => {

        console.log(data);
        this.sesionForm.patchValue({
          contrasena: data.contrasena,
          nombre: data.nombre,
          apellido: data.apellido,
          direccion: data.direccion,
          telefono : data.telefono,
          email: data.email,
          enabled: data.enabled,

        });
        this.selectedEstado = data.enabled;
        this.selectedRol = this.Rol.find(rol => rol.label === data.role.nombreRol);
      })
    }
  }

  onEstadoSelect(event: any) {
    console.log("Estado seleccionado:", event);
    this.sesionForm.patchValue({ enabled: event.node.data });

  }

  onRolSelect(event: any) {
    this.sesionForm.patchValue({ nombreRol: event.node.label });
  }
  onsubmit(){

    if(this.sesionForm.valid){
      const usuario: Usuario = new Usuario();
      usuario.idUsuario = this.id;
      usuario.contrasena = this.sesionForm.value.contrasena;
      usuario.nombre = this.sesionForm.value.nombre;
      usuario.apellido = this.sesionForm.value.apellido;
      usuario.direccion = this.sesionForm.value.direccion;
      usuario.telefono = this.sesionForm.value.telefono;
      usuario.email = this.sesionForm.value.email;
      usuario.enabled = this.sesionForm.value.enabled;

      usuario.role = new Rol();

      usuario.role.idRol = this.selectedRol?.data?.idRol;
      usuario.role.nombreRol = this.Rol.find(rol => rol.data.idRol === usuario.role.idRol)?.data.nombreRol || '';
      usuario.role.descripcion = '';
      console.log(usuario)

      if(!this.edicion){
        this.usuarioService.insert(usuario).subscribe((data:Object):void => {
          this.usuarioService.list().subscribe(data=>{
            this.usuarioService.setList(data);


          });

        });
      } else{
        console.log("Datos aceptdos",usuario);
        this.usuarioService.update(usuario).subscribe((data:Object):void => {
          this.usuarioService.list().subscribe(data=>{
            this.usuarioService.setList(data);
          })
        });
      }
      this.router.navigate(['Iniciarsesion-listar']);
      console.log("Formulario valido");

    }else {
      console.log("Formulario no valido");
      alert("Formulario no valido")
    }

  }



}
