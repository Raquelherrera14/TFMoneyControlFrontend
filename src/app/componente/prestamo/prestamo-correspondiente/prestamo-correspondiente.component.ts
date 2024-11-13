import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../../../services/prestamo.service';
import { PrestamoCorrespondiente } from '../../../model/prestamoCorrespondiente';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-prestamo-correspondiente',
  templateUrl: './prestamo-correspondiente.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DecimalPipe,
    DatePipe,
    MatButton,
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatRow,
    MatRowDef,
    MatSuffix,
    MatTable,
    MatHeaderCellDef
  ],
  styleUrls: ['./prestamo-correspondiente.component.css']
})
export class PrestamoCorrespondienteComponent implements OnInit {
  prestamoId: number = 0;
  pagosCorrespondientes: PrestamoCorrespondiente[] = [];
  displayedColumns: string[] = ['prestamoId', 'montoPrestamo', 'tasaInteres', 'montoTotalaPagar', 'fechaMaximaDePago'];
  datasource: MatTableDataSource<PrestamoCorrespondiente> = new MatTableDataSource<PrestamoCorrespondiente>();
  isLoading = false; // Loading indicator flag

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit(): void {

  }

  obtenerPagos(): void {
    this.isLoading = true; // Show loading indicator
    this.prestamoService.obtenerPagoCalculado(this.prestamoId).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Logs received data for debugging
        this.pagosCorrespondientes = data;
        this.datasource.data = data; // Assign data to datasource
        this.isLoading = false; // Hide loading indicator
      },
      error: (err) => {
        console.error('Error al obtener pagos correspondientes:', err);
        this.isLoading = false; // Hide loading indicator on error
      }
    });
  }
}
