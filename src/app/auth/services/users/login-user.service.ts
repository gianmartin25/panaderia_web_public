import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { UserRequest, UserResponse } from '../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService extends BaseHttpService {

  login(user: UserRequest) {
    return this.http.post<UserResponse>(`${this.apiUrl}/auth/login`, user);
  }

}
