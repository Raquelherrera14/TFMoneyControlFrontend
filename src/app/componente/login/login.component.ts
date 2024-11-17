import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {RequestDto} from '../../model/request-dto';
import {Router, RouterLink} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton, MatCard, MatCardContent, MatCardTitle, MatFormField, MatInput, MatLabel, MatOption, MatSelect, ReactiveFormsModule, NavbarComponent, MatCheckbox, MatIcon, RouterLink, MatCardActions],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  router: Router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService: LoginService = inject(LoginService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      contrasena: ['', Validators.required],
    })
  }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      localStorage.removeItem('token');
      console.log("Token eliminado");
    }
    this.loadForm()
  }

  loadForm(): void {
    console.log("Form");
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const requestDto: RequestDto = new RequestDto()
      requestDto.email= this.loginForm.value.email;
      requestDto.contrasena = this.loginForm.value.contrasena;
      this.loginService.login(requestDto).subscribe({
        next: (data: Object): void => {
          console.log("Login response:", data);
        }
      })
      alert("Login ok!")
      this.router.navigate(['/comofunciona'])
    } else {
      alert("Formulario no valido,Contra!")
      console.log("Formulario no valido");
      this.router.navigate(['/login'])
    }
  }

}
