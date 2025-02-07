import { Component } from '@angular/core';
import { FormRegisterClientCompanyComponent } from "../form-register-client-company/form-register-client-company.component";
import { FormRegisterClientPersonComponent } from '../form-register-client-person/form-register-client-person.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormRegisterClientCompanyComponent,FormRegisterClientPersonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  selectedOption = 'Persona'; // Estado inicial

  // Método para manejar cambios
  onSelectionChange(value: string): void {
    this.selectedOption = value;
    console.log('Selected Option:', this.selectedOption);
  }

}
