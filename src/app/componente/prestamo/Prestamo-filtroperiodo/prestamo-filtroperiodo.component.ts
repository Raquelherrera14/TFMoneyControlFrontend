import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Prestamo} from '../../../model/prestamo';
import {PrestamoService} from '../../../services/prestamo.service';
import {Prestamoperiodo} from '../../../model/prestamoperiodo';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatCard} from '@angular/material/card';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-prestamo-filtroperiodo-list',
  templateUrl: './prestamo-filtroperiodo.component.html',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatCard,
    MatDatepicker,
    MatDatepickerToggle,
    MatInput,
    MatDatepickerInput,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    DatePipe,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  styleUrls: ['./prestamo-filtroperiodo.component.css']
})

export class PrestamoFiltroperiodoComponent implements OnInit {
  filterForm: FormGroup;
  prestamos: Prestamo[] | Prestamoperiodo[] = [];
  displayedColumns: string[] = ['idPrestamo', 'nombreUsuario', 'montoPrestamo', 'fechaInicioPrestamo', 'fechaFinPrestamo', 'estadoPrestamo'];

  datasource : MatTableDataSource<Prestamoperiodo> = new MatTableDataSource<Prestamoperiodo>();
  constructor(private fb: FormBuilder, private prestamoService: PrestamoService) {
    this.filterForm = this.fb.group({
      fechaInicioPrestamo: [null],
      fechaFinPrestamo: [null],



    });
  }

  ngOnInit(): void {
    this.loadAllPrestamos();
  }

  loadAllPrestamos(): void {
    this.prestamoService.list().subscribe({
      next: (data) => (this.prestamos = data),
      error: (err) => console.error('Error fetching prestamos:', err)
    });
  }

  applyFilter(): void {
    const startDate = this.filterForm.get('fechaInicioPrestamo')?.value;
    const endDate = this.filterForm.get('fechaFinPrestamo')?.value;

    if (startDate && endDate) {
      this.prestamoService.filterByDateRange(startDate, endDate).subscribe({
        next: (data) => {
          this.prestamos = data;
          this.datasource.data = this.prestamos as Prestamoperiodo[]; // Actualiza el datasource
        },
        error: (err) => console.error('Error filtering prestamos:', err)
      });
    } else {
      this.loadAllPrestamos();
    }
  }



}
