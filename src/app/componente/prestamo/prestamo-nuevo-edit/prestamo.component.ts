import { Component, OnInit, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TreeSelectModule } from 'primeng/treeselect';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { PrestamoListarComponent } from '../prestamo-listar/prestamo-listar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../model/usuario';
import { PrestamoService } from '../../../services/prestamo.service';
import { Prestamo } from '../../../model/prestamo';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-prestamo',
  standalone: true,
    imports: [
        Button,
        InputTextModule,
        TreeSelectModule,
        RouterLink,
        PrestamoListarComponent,
        RouterOutlet,
        ReactiveFormsModule,
        NavbarComponent
    ],
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {

  prestamoForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  prestamoService: PrestamoService = inject(PrestamoService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  // Variables para la edición
  edicion: boolean = false;
  id: number = 0;

  constructor() {
    // Configuración del formulario reactivo
    this.prestamoForm = this.fb.group({
      idPrestamo: [''],
      monto: ['', Validators.required],
      tasaInteres: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['', Validators.required],
      idUsuario: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Verifica si el componente está en modo edición
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.cargaForm();
    });
  }

  private cargaForm() {
    // Carga los datos del préstamo en el formulario si está en modo edición
    if (this.edicion) {
      this.prestamoService.listId(this.id).subscribe((data: Prestamo) => {
        this.prestamoForm.patchValue({
          monto: data.monto,
          tasaInteres: data.tasaInteres,
          fechaInicio: data.fechaInicio,
          fechaFin: data.fechaFin,
          estado: data.estado,
          idUsuario: data.usuario?.idUsuario
        });
      });
    }
  }

  onsubmit() {
    if (this.prestamoForm.valid) {
      const prestamo: Prestamo = new Prestamo();
      prestamo.idPrestamo = this.id;
      prestamo.monto = this.prestamoForm.value.monto;
      prestamo.tasaInteres = this.prestamoForm.value.tasaInteres;
      prestamo.fechaInicio = this.prestamoForm.value.fechaInicio;
      prestamo.fechaFin = this.prestamoForm.value.fechaFin;
      prestamo.estado = this.prestamoForm.value.estado;

      prestamo.usuario = new Usuario();
      prestamo.usuario.idUsuario = this.prestamoForm.value.idUsuario;

      if (!this.edicion) {
        this.prestamoService.insert(prestamo).subscribe((data: Object) => {
          this.prestamoService.list().subscribe(data => {
            this.prestamoService.setList(data);
          });
        });
      } else {
        this.prestamoService.update(prestamo).subscribe((data: Object) => {
          this.prestamoService.list().subscribe(data => {
            this.prestamoService.setList(data);
          });
        });
      }
      this.router.navigate(['Invertir']);
    } else {
      alert("Formulario no válido");
    }
  }
  private actualizarListaYRedirigir() {
    // Actualiza la lista de préstamos y redirige
    this.prestamoService.list().subscribe((data) => {
      this.prestamoService.setList(data);
      this.router.navigate(['Invertir']); // Navega después de actualizar la lista
    });
  }
}
