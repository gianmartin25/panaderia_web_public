import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment.development';
import { BaseHttpService } from './base-http.service';

interface CartRequest {
  cantidad: number;
  idProducto: number;
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService extends BaseHttpService {
  private stripePromise = loadStripe(environment.stripeAPIKey);

  async redirectToCheckout(amount: number): Promise<void> {
    const stripe = await this.stripePromise;

    if (!stripe) {
      throw new Error('Stripe no se cargó correctamente.');
    }

    // Llamar al backend para crear una sesión de Checkout
    const response = await this.http
      .post<{
        url: string;
      }>(`${this.apiUrl}/pagos/crear-sesion-pagos`, { amount })
      .toPromise();
    // Redirigir al usuario a la página de Stripe Checkout
    if (response?.url) {
      window.location.href = response.url;
    }
  }

  createCheckoutSession(orderId: number, cartRequest: CartRequest[]) {
    return this.http.post<{ url: string }>(
      'http://localhost:8080/api/pagos/crear-sesion-pagos',
      { ordenId: orderId, productos: cartRequest },
    );
  }
}
