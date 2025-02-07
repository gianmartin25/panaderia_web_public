import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userSubject = new BehaviorSubject<Usuario | null>(null);

  setUser(user: Usuario) {
    this.userSubject.next(user);
  }

  getUser(): Usuario | null {
    return this.userSubject.value;
  }

  getUserObservable(): Observable<Usuario | null> {
    return this.userSubject.asObservable();
  }
}
