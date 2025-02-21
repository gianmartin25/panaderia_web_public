import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserLocalStorageService {
  setUser(user: Usuario | null) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Usuario | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
