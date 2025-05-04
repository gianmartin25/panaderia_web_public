import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { RegisterClientPerson } from '../../../shared/interfaces/register-client-person.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientPersonService extends BaseHttpService {
  registerPerson(registerToPerson: RegisterClientPerson) {
    return this.http.post(`${this.apiUrl}/usuarios/persona`, registerToPerson)
  }

  deletePersons() {
    return this.http.delete(`${this.apiUrl}/usuarios`);
  }
}
