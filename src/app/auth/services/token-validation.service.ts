import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../shared/interfaces/user';
import { BaseHttpService } from '../../shared/data-access/base-http.service';

@Injectable({
  providedIn: 'root'
})
export class TokenValidationService extends BaseHttpService {
  getUserFromToken(token: string): Observable<Usuario> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${this.apiUrl}/auth/validate`, { headers });
  }
}
