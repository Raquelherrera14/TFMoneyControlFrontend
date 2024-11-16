import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-confirmdialoggarantia',
  standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        NavbarComponent
    ],
  templateUrl: './confirmdialoggarantia.component.html',
  styleUrl: './confirmdialoggarantia.component.css'
})
export class ConfirmdialoggarantiaComponent {

}
