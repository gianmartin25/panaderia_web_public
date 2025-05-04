// import { HttpClientModule } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { RegisterClientCompany } from '../../shared/interfaces/register-client-company.interface';
// import { ClientCompanyService } from './client-company.service';

// describe('ClientCompanyService', () => {
//   let service: ClientCompanyService;

//   const mockRegisterCompany: RegisterClientCompany = {
//     email: 'sagafalabella@google.com',
//     password: 'saga123',
//     username: 'sagafalabella',
//     direccionEmpresa: 'chorrillos',
//     nombreEmpresa: 'Saga',
//     razonSocial: 'Saga Falabella SAC',
//     telefono: '502155',
//     numeroDocumento: '135458588',
//   };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule],
//       providers: [ClientCompanyService],
//     });
//     service = TestBed.inject(ClientCompanyService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should register a company successfully', (done) => {
//     service.deleteCompanies().subscribe(
//       () => {
//         console.log('Successfully deleted companies in beforeEach');
//         service.registerCompany(mockRegisterCompany).subscribe(
//           (response) => {
//             expect(response).toBeTruthy();
//             done();
//           },
//           () => {
//             fail('expected a successful registration, but got an error');
//             done();
//           },
//         );
//       },
//       (error) => {
//         console.error('Error in beforeEach:', error);
//         done.fail('Failed to delete companies in beforeEach');
//       },
//     );
//   });

//   it('should produce an error when trying to register with an existing email', (done) => {
//     service.registerCompany(mockRegisterCompany).subscribe(
//       () => {
//         fail('expected an error, not a successful registration');
//         done();
//       },
//       (error) => {
//         console.log('Error registro duplicado empresa:', error);
//         expect(error.status).toBe(400);
//         expect(error.error).toContain('El usuario ya existe');
//         done();
//       },
//     );
//   });
// });
