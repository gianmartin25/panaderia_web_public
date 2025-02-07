import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginUserService } from '../../products/data-access/login-user.service';
import { UserRequest } from '../../shared/interfaces/user';
import { RouterAdapterService } from '../../shared/services/router-adapter.service';
import { JwtService } from '../services/jwt.service';
import { UserStateService } from '../services/user-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private loginUserService = inject(LoginUserService);
  private jwtService = inject(JwtService);
  private userStateService = inject(UserStateService);
  private router = inject(RouterAdapterService);
  public errorMessage = '';

  public loginUserForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    console.log(this.loginUserForm.value);
    this.loginUser();
  }

  loginUser() {
    if (this.loginUserForm.invalid) return;
    const user = this.loginUserForm.value as UserRequest;
    this.loginUserService.login(user).subscribe({
      next: (response) => {
        this.jwtService.saveToken(response.token);
        this.userStateService.setUser(response.usuario);
        this.router.navigate('/products');
      },
      error: ({ error }) => {
        this.errorMessage = error;
      },
    });
  }
}
