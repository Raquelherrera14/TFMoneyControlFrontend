import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-comofunciona',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './comofunciona.component.html',
  styleUrl: './comofunciona.component.css'
})
export class ComofuncionaComponent {

}
