import {Component, NgIterable} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {PrestamoListarComponent} from '../prestamo/prestamo-listar/prestamo-listar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {NavbarComponent} from '../navbar/navbar.component';

class Tile {
}

@Component({
  selector: 'app-invertir',
  standalone: true,
  imports: [
    RouterLink,
    MatGridList,
    MatGridTile,
    NgForOf,
    MatButton,
    PrestamoListarComponent,
    MatGridListModule,
    NavbarComponent
  ],
  templateUrl: './invertir.component.html',
  styleUrl: './invertir.component.css',
  //selector: 'grid-list-dynamic-example',

})
export class InvertirComponent {
  azulejos: (NgIterable<unknown> & NgIterable<any>) | undefined | null;
  tiles: Tile[] = [
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}
