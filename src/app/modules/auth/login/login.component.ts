import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if ((this, this.loginForm.valid)) {
      const { email, password } = this.loginForm.value;
      if (this.authService.login(email, password)) {
        alert('Login efetuado com sucesso!');
        this.router.navigate(['/']);
      } else {
        alert('Usuário ou senha incorretos!');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
