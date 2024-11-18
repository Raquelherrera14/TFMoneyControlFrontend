import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import {PrestamoService} from '../../../services/prestamo.service';
import {Estadisticasprestamo} from '../../../model/estadisticasprestamo';
import {NgIf} from '@angular/common';
import {NavbarComponent} from "../../navbar/navbar.component";
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-estadisticasprestamo',
  templateUrl: './estadisticaprestamo.component.html',
  styleUrls: ['./estadisticaprestamo.component.css'],
  imports: [
    NgIf,
    NavbarComponent,
    MatButton,
    RouterLink
  ],
  standalone: true
})
export class EstadisticaprestamoComponent implements OnInit {

  estadistica: Estadisticasprestamo[] = [];

  chart: any;
  datosCargados = false;
  error: string | null = null;

  // Valores iniciales
  promedioMonto = 0;
  totalMonto = 0;
  cantidadPrestamos = 0;

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.prestamoService.calcularEstadisticasPrestamos().subscribe({
      next: (data: Estadisticasprestamo[]) => {
        const estadistica = data[0];
        if (estadistica) {
          this.promedioMonto = estadistica.promedioMonto;
          this.totalMonto = estadistica.totalMonto;
          this.cantidadPrestamos = estadistica.cantidadPrestamos;
          this.datosCargados = true;
          this.createChart();
        }
      },

      error: (err) => {
        console.error('Error al cargar las estadísticas:', err);
        this.error = 'No se pudieron cargar las estadísticas.';
      },
    });


  }

  createChart() {
    // @ts-ignore
    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Promedio Monto', 'Total Monto', 'Cantidad Préstamos'],
        datasets: [
          {
            label: 'Estadísticas de Préstamos',
            data: [this.promedioMonto, this.totalMonto, this.cantidadPrestamos],
            backgroundColor: ['#ff00df', '#2196f3', '#f80000'],
            borderColor: ['#ffd700', '#ffcc00', '#ffcc00'],
            borderWidth: 3,
            borderRadius:10,
            hoverBorderWidth:5,
            barThickness: 200,

          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
}
