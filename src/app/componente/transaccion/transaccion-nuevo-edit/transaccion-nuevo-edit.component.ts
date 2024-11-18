import {Component, inject} from '@angular/core';

import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TreeSelectModule} from 'primeng/treeselect';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {Garantia} from '../../../model/garantia';
import {Usuario} from '../../../model/usuario';
import {TransaccionListarComponent} from '../transaccion-listar/transaccion-listar.component';
import {Transacciones} from '../../../model/transacciones';
import {Prestamo} from '../../../model/prestamo';
import {TransaccionesService} from '../../../services/transacciones.service';
import {NavbarComponent} from '../../navbar/navbar.component';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-transaccion-nuevo-edit',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    TreeSelectModule,
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    TransaccionListarComponent,
    NavbarComponent,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatFormField,
    MatOption,
    MatSelect,
    MatInput,
    MatIcon,
    MatFabButton,
    MatLabel
  ],
  templateUrl: './transaccion-nuevo-edit.component.html',
  styleUrl: './transaccion-nuevo-edit.component.css'
})
export class TransaccionNuevoEditComponent {

  transaccionForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  transaccionService: TransaccionesService = inject(TransaccionesService);
  router: Router = inject(Router);


  constructor() {
    this.transaccionForm=this.fb.group({
      idTransacciones: [''],
      montoTransaccion: ['',Validators.required],
      fechaTransaccion: ['',Validators.required],
      tipoTransaccion: ['',Validators.required],
      descripcion: ['', Validators.required],
      metodoPago: ['', Validators.required],
      estadoTransaccion: ['', Validators.required],
      idPrestamo: ['', Validators.required],

    })
  }



  onsubmit(){

    if(this.transaccionForm.valid){
      const transacciones: Transacciones = new Transacciones();
      transacciones.idTransacciones = this.transaccionForm.value.id;
      transacciones.montoTransaccion = this.transaccionForm.value.montoTransaccion;
      transacciones.tipoTransaccion = this.transaccionForm.value.tipoTransaccion;
      transacciones.descripcion = this.transaccionForm.value.descripcion;
      transacciones.metodoPago = this.transaccionForm.value.metodoPago;
      transacciones.estadoTransaccion = this.transaccionForm.value.estadoTransaccion;

      transacciones.prestamo = new Prestamo();
      transacciones.prestamo.idPrestamo = this.transaccionForm.value.idPrestamo;



      console.log(transacciones);
      this.transaccionService.insert(transacciones).subscribe((data:Object):void => {
        this.transaccionService.list().subscribe(data=>{
          this.transaccionService.setList(data);

        });

      });

      this.router.navigate(['Transaccion']);
      console.log("Formulario valido");

    }else {
      console.log("Formulario no valido");
      alert("Formulario no valido")
    }

  }

}
