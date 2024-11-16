import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from "../navbar/navbar.component";
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-comunidad',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    MatButton
  ],
  templateUrl: './comunidad.component.html',
  styleUrl: './comunidad.component.css'
})
export class ComunidadComponent {

}
