import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Transacciones } from '../../../model/transacciones';
import { TransaccionesService } from '../../../services/transacciones.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import {NavbarComponent} from '../../navbar/navbar.component';  // Agrega esto

@Component({
  selector: 'app-transaccion-filtroperiodo',
  templateUrl: './transaccion-filtroperiodo.html',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    DatePipe,
    RouterModule,
    MatNativeDateModule,
    NavbarComponent
  ],
  styleUrls: ['./transaccion-filtroperiodo.css']
})
export class TransaccionFiltroperiodo implements OnInit {
  filterForm: FormGroup;
  transaccion: Transacciones[]| TransaccionFiltroperiodo[] = [];
  displayedColumns: string[] = ['idUsuario', 'nombreUsuario', 'idTransaccion', 'montoTransaccion', 'fechaTransaccion', 'estadoTransaccion'];
  datasource: MatTableDataSource<TransaccionFiltroperiodo> = new MatTableDataSource<TransaccionFiltroperiodo>();

  constructor(private fb: FormBuilder, private transacccionService: TransaccionesService) {
    this.filterForm = this.fb.group({
      fechaTransaccionInicio: [null],
      fechaTransaccionFin: [null]
    });
  }

  ngOnInit(): void {
    this.loadAllTransaccion();
  }

  loadAllTransaccion(): void {
    this.transacccionService.list().subscribe({
      next: (data) => (this.transaccion = data),
      error: (err) => console.error('Error fetching prestamos:', err)
    });
  }

  applyFilter(): void {
    const startDate = this.filterForm.get('fechaTransaccionInicio')?.value;
    const endDate = this.filterForm.get('fechaTransaccionFin')?.value;

    if (startDate && endDate) {
      this.transacccionService.filterByDateRange(startDate, endDate).subscribe({
        next: (data) => {
          this.transaccion = data;
          this.datasource.data = this.transaccion;
        },
        error: (err) => console.error('Error filtering transacciones:', err)
      });
    } else {
      this.loadAllTransaccion();
    }
  }
}
