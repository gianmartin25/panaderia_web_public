import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginUserService } from './login-user.service';
import { UserRequest, UserResponse } from '../../../shared/interfaces/user';

describe('LoginUserService Integration Test', () => {
  let service: LoginUserService;
  const mockUserRequest: UserRequest = { email: 'john.doe@example.com', password: 'password123' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginUserService]
    });
    service = TestBed.inject(LoginUserService);
  });

  it('debe iniciar sesión el usuario correctamente', (done) => {
  service.login(mockUserRequest).subscribe({
    next: (response: UserResponse) => {
      expect(response).toBeDefined();
      done();
    },
    error: (error) => {
      console.log('Error:', error);
      fail('Se esperaba un inicio de sesión exitoso, pero se obtuvo un error');
      done();
    },
  });
  }); // Cambia el nombre de la prueba

  it('debe mostrar un mensaje de error de credenciales invalidas', (done) => {
    const mockUserRequest: UserRequest = { email: 'testUser@google.com', password: 'password123' };

    service.login(mockUserRequest).subscribe({
      next: (response: UserResponse) => {
        expect(response).toBeUndefined();
        done();
      },
      error: (error) => {
        console.log('Error:', error);
        expect(error).toBeDefined();
        done();
      }
    });
  });
});