import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ClientPersonService } from './client-person.service';
import { RegisterClientPerson } from '../../../shared/interfaces/register-client-person.interface';

describe('ClientPersonService', () => {
  let service: ClientPersonService;

  const mockRegisterPerson: RegisterClientPerson = {
    email: 'john.doe@example.com',
    password: 'password123',
    direccionEmpresa: 'chorrillos',
    fechaNacimiento: '1990-01-01',
    username: 'johndoe',
    nombres: 'John',
    apellidos: 'Doe',
    telefono: '123456789',
    numeroDocumento: '987654321',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Usa HttpClientTestingModule en vez de HttpClientModule
      providers: [ClientPersonService],
    });
    service = TestBed.inject(ClientPersonService);
  });

  it('debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe registrar el usuario exitosamente', (done) => {
    service.deletePersons().subscribe(
      () => {
        service.registerPerson(mockRegisterPerson).subscribe(
          (response) => {
            console.log('Response:', response);
            expect(response).toBeTruthy();
            done();
          },
          (error) => {
            console.log('Error:', error);
            fail('expected a successful registration, but got an error');
            done();
          }
        );
      },
      (error) => {
        console.error('Error in beforeEach:', error);
        done.fail('Failed to delete persons');
      },
    );
   
  });

  it('debe producir un error al intentar registrarse con usuario existente', (done) => {
    service.registerPerson(mockRegisterPerson).subscribe(
      () => {
        fail('expected an error, not a successful registration');
        done();
      },
      (error) => {
        console.log('Error registro duplicado persona:', error);
        expect(error.status).toBe(400);
        expect(error.error).toContain('El usuario ya existe');
        done();
      }
    );
  });
});
