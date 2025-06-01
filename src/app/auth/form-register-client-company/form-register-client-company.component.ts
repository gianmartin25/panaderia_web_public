import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterClientCompany } from '../../shared/interfaces/register-client-company.interface';
import { CommonModule } from '@angular/common';
import { ClientCompanyService } from '../services/users/client-company.service';
import { LoaderEmailComponent } from '../../shared/ui/loaders/loader-email/loader-email.component';

@Component({
  selector: 'app-form-register-client-company',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoaderEmailComponent],
  templateUrl: './form-register-client-company.component.html',
  styleUrl: './form-register-client-company.component.scss',
})
export class FormRegisterClientCompanyComponent {
  public isLoading = false;
  private clientCompanyService = inject(ClientCompanyService);
  private formBuilder = inject(FormBuilder);
  public formRegisterCompany = this.formBuilder.group({
    email: 'sagafalabella@google.com',
    password: 'saga123',
    username: 'sagafalabella',
    direccionEmpresa: 'chorrillos',
    nombreEmpresa: 'Saga Falabella',
    razonSocial: 'Saga Falabella SAC',
    telefono: ['987878788', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    numeroDocumento: ['12345678911', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
  });

  public status = '';
  public message = '';

  onSubmit() {
    const registerCompany = this.formRegisterCompanyToClientCompany();
    if (this.formRegisterCompany.invalid) {
      this.status = 'error';
      this.message = 'Por favor, completa todos los campos correctamente.';
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.registerCompany(registerCompany);
  }

  registerCompany(registerCompany: RegisterClientCompany) {
    this.clientCompanyService.registerCompany(registerCompany).subscribe({
      next: () => {
        this.status = 'success';
        this.message =
          'Datos Registrados Correctamente. Por favor, Verifica tu correo electrónico para activar tu cuenta.';
        this.isLoading = false;
      },
      error: () => {
        this.status = 'error';
        this.message = 'Los Datos no cumplieron con los requisitos';
        this.isLoading = false;
      },
      complete: () => {
        setTimeout(() => {
          this.status = '';
          this.message = '';
        }, 3000);
      }
    });

    setTimeout(() => {
      this.status = '';
      this.message = '';
      this.isLoading = false;
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
      numeroDocumento: this.formRegisterCompany.value.numeroDocumento ?? '',
    };
  }
}
