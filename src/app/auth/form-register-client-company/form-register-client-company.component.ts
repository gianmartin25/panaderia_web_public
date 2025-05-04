import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegisterClientCompany } from '../../shared/interfaces/register-client-company.interface';
import { CommonModule } from '@angular/common';
import { ClientCompanyService } from '../services/users/client-company.service';

@Component({
  selector: 'app-form-register-client-company',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-register-client-company.component.html',
  styleUrl: './form-register-client-company.component.scss'
})
export class FormRegisterClientCompanyComponent {
  private clientCompanyService = inject(ClientCompanyService);
  private formBuilder = inject(FormBuilder)
  public formRegisterCompany = this.formBuilder.group({
    email: "sagafalabella@google.com",
    password: "saga123",
    username: "sagafalabella",
    direccionEmpresa: "chorrillos",
    nombreEmpresa: "Saga Falabella",
    razonSocial: "Saga Falabella SAC",
    telefono: "502155",
    numeroDocumento: "135458588"
  })

  public status = ''
  public message = ''


  onSubmit() {
    const registerCompany = this.formRegisterCompanyToClientCompany();
    this.registerCompany(registerCompany);
  }

  registerCompany(registerCompany: RegisterClientCompany) {
    this.clientCompanyService.registerCompany(registerCompany).subscribe({
      next: () => {
        console.log('Company registered successfully');
        this.status = 'success';
        this.message = 'Datos Registrados Correctamente';
      },
      error: (error) => {
        console.error('Error registering company', error);  
        this.status = 'error';
        this.message = 'Los Datos no cumplieron con los requisitos';
      }
    });

    setTimeout(() => {
      this.status = '';
      this.message = '';
    }, 3000);
  }

  formRegisterCompanyToClientCompany(): RegisterClientCompany {
    return {
      email: this.formRegisterCompany.value.email ?? '',
      password: this.formRegisterCompany.value.password ?? '',
      username: this.formRegisterCompany.value.username ?? '',
      direccionEmpresa: this.formRegisterCompany.value.direccionEmpresa ?? '',
      nombreEmpresa: this.formRegisterCompany.value.nombreEmpresa ?? '',
      razonSocial: this.formRegisterCompany.value.razonSocial ?? '',
      telefono: this.formRegisterCompany.value.telefono ?? '',
      numeroDocumento: this.formRegisterCompany.value.numeroDocumento ?? ''
    }
  }

}
