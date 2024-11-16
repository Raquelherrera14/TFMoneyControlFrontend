import {Component, ViewChild} from '@angular/core';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {Rol} from '../../model/rol';

@Component({
  selector: 'app-rol-listar',
  standalone: true,
  imports: [
    MatTable,
    RouterLink,
    MatHeaderRow,
    MatHeaderRowDef,
    MatHeaderCell,
    MatCell,
    MatButton,
    MatColumnDef,

  ],
  templateUrl: './rol-listar.component.html',
  styleUrl: './rol-listar.component.css'
})
export class RolListarComponent {




}

