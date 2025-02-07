import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginUserService } from './login-user.service';
import { UserRequest, UserResponse } from '../../shared/interfaces/user';

describe('LoginUserService Integration Test', () => {
  let service: LoginUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LoginUserService]
    });
    service = TestBed.inject(LoginUserService);
  });

  it('should login user with real backend', (done) => {
    const mockUserRequest: UserRequest = { email: 'test@test.com', password: 'password' };

    service.login(mockUserRequest).subscribe({
      next: (response: UserResponse) => {
        expect(response).toBeTruthy();
        expect(response.usuario).toBeDefined();
        expect(response.token).toBeDefined();
        done();
      },
      error: (error) => {
        fail(`Expected successful login, but got error: ${error.message}`);
        console.log('Error:', error);
        done();
      }
    });
  });
});