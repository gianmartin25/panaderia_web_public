import { Component, inject } from '@angular/core';
import { RegisterClientPerson } from '../../shared/interfaces/register-client-person.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientPersonService } from '../services/users/client-person.service';

@Component({
  selector: 'app-form-register-client-person',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-register-client-person.component.html',
  styleUrl: './form-register-client-person.component.scss'
})
export class FormRegisterClientPersonComponent {
  private clientPersonService = inject(ClientPersonService);
  private formBuilder = inject(FormBuilder)
  public formRegisterPersonClient = this.formBuilder.group({
    email: "martin@google.com",
    password: "martin123",
    username: "martin25",
    direccionEmpresa: "independencia",
    apellidos: "Hermenegildo",
    fechaNacimiento: "2003-08-25",
    nombres: "Gian Martin",
    telefono: "987878788",
    numeroDocumento: "732548844"
  })
  public status = ''
  public message = ''

  onSubmit() {
    const registerCompany = this.formRegisterPersonToClientPerson();
    this.registerCompany(registerCompany);
  }

  registerCompany(registerToPeson: RegisterClientPerson) {
    this.clientPersonService.registerPerson(registerToPeson).subscribe({
      next: () => {
        console.log('Client Person registered successfully');
        this.status = 'success';
        this.message = 'Datos Registrados Correctamente';
      },
      error: (error) => {
        console.error('Error registering Person', error);
        this.status = 'error';
        this.message = 'Los Datos no cumplieron con los requisitos o el usuario ya existe';
      }
    });

    setTimeout(() => {
      this.status = '';
      this.message = '';
    }, 3000);
  }


  formRegisterPersonToClientPerson(): RegisterClientPerson {
    return {
      email: this.formRegisterPersonClient.value.email ?? '',
      password: this.formRegisterPersonClient.value.password ?? '',
      username: this.formRegisterPersonClient.value.username ?? '',
      direccionEmpresa: this.formRegisterPersonClient.value.direccionEmpresa ?? '',
      apellidos: this.formRegisterPersonClient.value.apellidos ?? '',
      fechaNacimiento: this.formRegisterPersonClient.value.fechaNacimiento ?? '',
      nombres: this.formRegisterPersonClient.value.nombres ?? '',
      telefono: this.formRegisterPersonClient.value.telefono ?? '',
      numeroDocumento: this.formRegisterPersonClient.value.numeroDocumento ?? ''
    }
  }
}
