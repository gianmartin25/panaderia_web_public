import { Component, inject } from '@angular/core';
import { RegisterClientPerson } from '../../shared/interfaces/register-client-person.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientPersonService } from '../services/users/client-person.service';
import { LoaderEmailComponent } from '../../shared/ui/loaders/loader-email/loader-email.component';

@Component({
  selector: 'app-form-register-client-person',
  standalone: true,
  imports: [LoaderEmailComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './form-register-client-person.component.html',
  styleUrl: './form-register-client-person.component.scss',
})
export class FormRegisterClientPersonComponent {
  public isLoading = false;
  private clientPersonService = inject(ClientPersonService);
  private formBuilder = inject(FormBuilder);
  public formRegisterPersonClient = this.formBuilder.group({
    email: 'martin@google.com',
    password: 'martin123',
    username: 'martin25',
    direccionEmpresa: 'independencia',
    apellidos: 'Hermenegildo',
    fechaNacimiento: '2003-08-25',
    nombres: 'Gian Martin',
    telefono: ['987878788', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    numeroDocumento: ['12345678', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
  });
  public status = '';
  public message = '';

  onSubmit() {
    const registerCompany = this.formRegisterPersonToClientPerson();
    if (this.formRegisterPersonClient.invalid) {
      this.status = 'error';
      this.message = 'Por favor, completa todos los campos correctamente.';
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.registerClientPerson(registerCompany);
  }

  registerClientPerson(registerToPeson: RegisterClientPerson) {
    this.clientPersonService.registerPerson(registerToPeson).subscribe({
      next: () => {
        this.status = 'success';
        this.message =
          'Datos Registrados Correctamente. Por favor, Verifica tu correo electrónico para activar tu cuenta.';
        this.isLoading = false;
      },
      error: () => {
        this.status = 'error';
        this.message =
          'Los Datos no cumplieron con los requisitos o el usuario ya existe';
        this.isLoading = false;
      },
      complete: () => {
        setTimeout(() => {
          this.status = '';
          this.message = '';
        }, 3000);
      }
    });
  }

  formRegisterPersonToClientPerson(): RegisterClientPerson {
    return {
      email: this.formRegisterPersonClient.value.email ?? '',
      password: this.formRegisterPersonClient.value.password ?? '',
      username: this.formRegisterPersonClient.value.username ?? '',
      direccionEmpresa:
        this.formRegisterPersonClient.value.direccionEmpresa ?? '',
      apellidos: this.formRegisterPersonClient.value.apellidos ?? '',
      fechaNacimiento:
        this.formRegisterPersonClient.value.fechaNacimiento ?? '',
      nombres: this.formRegisterPersonClient.value.nombres ?? '',
      telefono: this.formRegisterPersonClient.value.telefono ?? '',
      numeroDocumento:
        this.formRegisterPersonClient.value.numeroDocumento ?? '',
    };
  }
}
