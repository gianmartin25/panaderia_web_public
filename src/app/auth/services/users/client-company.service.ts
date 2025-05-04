import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { RegisterClientCompany } from '../../../shared/interfaces/register-client-company.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientCompanyService extends BaseHttpService {
  registerCompany(registerCompany: RegisterClientCompany) {
    return this.http.post(`${this.apiUrl}/usuarios/empresa`, registerCompany);
  }

  deleteCompanies() {
    return this.http.delete(`${this.apiUrl}/usuarios`);
  }
}
