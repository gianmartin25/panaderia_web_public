import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/ui/header/header.component';
import { TokenValidationService } from './auth/services/token-validation.service';
import { UserStateService } from './auth/services/user-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'signal-store';
  private tokenValidationService = inject(TokenValidationService);
  private userStateService = inject(UserStateService);
  
  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenValidationService.getUserFromToken(token).subscribe({
        next: (data) => {
          this.userStateService.setUser(data);
          console.log('User loaded:', data);
        },
        error: (err) => {
          console.error('Failed to load user', err);
          localStorage.removeItem('token'); // Elimina el token si es inválido
        },
      });
    } else {
      console.log('No token found');
    }
  }
}
