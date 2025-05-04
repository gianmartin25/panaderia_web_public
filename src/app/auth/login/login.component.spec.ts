import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { RouterAdapterService } from '../../shared/services/router-adapter.service';
import { JwtService } from '../services/jwt.service';
import { LoginComponent } from './login.component';
import { UserStateService } from '../services/user-state.service';
import { LoginUserService } from '../services/users/login-user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginUserService: jasmine.SpyObj<LoginUserService>;
  let jwtService: jasmine.SpyObj<JwtService>;
  let userStateService: jasmine.SpyObj<UserStateService>;
  let router: jasmine.SpyObj<RouterAdapterService>;

  beforeEach(async () => {
    const loginUserServiceSpy = jasmine.createSpyObj('LoginUserService', ['login']);
    const jwtServiceSpy = jasmine.createSpyObj('JwtService', ['saveToken']);
    const userMemoryServiceSpy = jasmine.createSpyObj('UserMemoryService', ['setUser']);
    const routerSpy = jasmine.createSpyObj('RouterAdapterService', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: LoginUserService, useValue: loginUserServiceSpy },
        { provide: JwtService, useValue: jwtServiceSpy },
        { provide: UserStateService, useValue: userMemoryServiceSpy },
        { provide: RouterAdapterService, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginUserService = TestBed.inject(LoginUserService) as jasmine.SpyObj<LoginUserService>;
    jwtService = TestBed.inject(JwtService) as jasmine.SpyObj<JwtService>;
    userStateService = TestBed.inject(UserStateService) as jasmine.SpyObj<UserStateService>;
    router = TestBed.inject(RouterAdapterService) as jasmine.SpyObj<RouterAdapterService>;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener un formulario con controles de email y contraseña', () => {
    expect(component.loginUserForm.contains('email')).toBeTruthy();
    expect(component.loginUserForm.contains('password')).toBeTruthy();
  });

  it('debería hacer que los controles de email y contraseña sean obligatorios', () => {
    const emailControl = component.loginUserForm.get('email');
    const passwordControl = component.loginUserForm.get('password');

    emailControl?.setValue('');
    passwordControl?.setValue('');

    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();
  });

  it('debería llamar a loginUserService.login al iniciar sesión', () => {
    const user = { email: 'test@test.com', password: 'password' };
    component.loginUserForm.setValue(user);
    loginUserService.login.and.returnValue(
      of({
        token: 'token',
        usuario: {
          id: '1',
          username: 'test',
          email: 'test@test.com',
          tipoUsuario: 'user',
          tipoCliente: 'persona',
        },
      }),
    );

    component.loginUser();

    expect(loginUserService.login).toHaveBeenCalledWith(user);
  });

  it('debería guardar el token y establecer el usuario al iniciar sesión correctamente', () => {
    const user = { email: 'test@test.com', password: 'password' };
    const response = {
      token: 'token',
      usuario: {
        id: '1',
        username: 'test',
        email: 'test@test.com',
        tipoUsuario: 'user',
        tipoCliente: 'persona',
      },
    };
    component.loginUserForm.setValue(user);
    loginUserService.login.and.returnValue(of(response));

    component.loginUser();

    expect(jwtService.saveToken).toHaveBeenCalledWith(response.token);
    expect(userStateService.setUser).toHaveBeenCalledWith(response.usuario);
    expect(router.navigate).toHaveBeenCalledWith('/products');
  });

  it('debería manejar el error de inicio de sesión', () => {
    const user = { email: 'test@test.com', password: 'password' };
    const errorMessage = 'Error de inicio de sesión';
    component.loginUserForm.setValue(user);
    loginUserService.login.and.returnValue(
      throwError(() => ({ error: errorMessage })),
    );

    component.loginUser();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error-message');
    expect(component.errorMessage).toBe(errorMessage);
    expect(errorElement.textContent).toContain(errorMessage);
    expect(jwtService.saveToken).not.toHaveBeenCalled();
    expect(userStateService.setUser).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debería enviar el formulario y llamar a loginUser', () => {
    const user = { email: 'test@test.com', password: 'password' };
    component.loginUserForm.setValue(user);
    loginUserService.login.and.returnValue(
      of({
        token: 'token',
        usuario: {
          id: '1',
          username: 'test',
          email: 'test@test.com',
          tipoUsuario: 'user',
          tipoCliente: 'persona',
        },
      }),
    );

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(loginUserService.login).toHaveBeenCalledWith(user);
  });
});