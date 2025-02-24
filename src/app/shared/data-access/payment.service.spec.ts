import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';
import { environment } from '../../../environments/environment';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
    });
    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initiate payment session', () => {
    const orderId = 1;
    const cartRequest = [{ cantidad: 2, idProducto: 1 }];
    const mockResponse = { url: 'http://example.com/checkout' };

    service
      .initiatePaymentSession(orderId, cartRequest)
      .subscribe((response) => {
        expect(response.url).toBe(mockResponse.url);
      });

    const req = httpMock.expectOne(
      `${environment.API_URL}/pagos/crear-sesion-pagos`,
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      ordenId: orderId,
      productos: cartRequest,
    });
    req.flush(mockResponse);
  });
});
