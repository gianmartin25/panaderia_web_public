import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { UserRequest } from '../../shared/interfaces/user';
import { RouterAdapterService } from '../../shared/services/router-adapter.service';
import { JwtService } from '../services/jwt.service';
import { UserLocalStorageService } from '../services/user-local-storage.service';
import { UserStateService } from '../services/user-state.service';
import { LoginUserService } from '../services/users/login-user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private loginUserService = inject(LoginUserService);
  private jwtService = inject(JwtService);
  private userStateService = inject(UserStateService);
  private userLocalStorageService = inject(UserLocalStorageService);
  private cartState = inject(CartStateService).state;
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
    this.cartState.clearCart();
    const user = this.loginUserForm.value as UserRequest;
    this.loginUserService.login(user).subscribe({
      next: (response) => {
        this.jwtService.saveToken(response.token);
        this.userStateService.setUser(response.usuario);
        this.router.navigate('/products');
        this.userLocalStorageService.setUser(response.usuario);
      },
      error: ({ error, status }) => {
        if (status === 401 || status === 403) {
          this.errorMessage = error.error;
          return;
        }
        this.errorMessage =
          'No se pudo iniciar sesión. Por favor, inténtelo de nuevo más tarde.';
      },
    });
  }
}
