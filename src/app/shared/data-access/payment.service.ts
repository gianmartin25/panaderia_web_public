import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';

interface CartRequest {
  cantidad: number;
  idProducto: number;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseHttpService {
  // private stripePromise = loadStripe(environment.stripeAPIKey);

  initiatePaymentSession(orderId: number, cartRequest: CartRequest[]) {
    return this.http.post<{ url: string }>(
      `${this.apiUrl}/pagos/crear-sesion-pagos`,
      { ordenId: orderId, productos: cartRequest },
    );
  }
}
