import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../shared/data-access/payment.service';
import { CartStateService } from '../../shared/data-access/cart-state.service';
import { DeliveryAddressService } from '../services/delivery-address.service';
import { OrderService } from '../../orders/services/order.service';
import { OrderProductRequest } from '../../orders/interfaces/order-product-request.interface';
import { UserStateService } from '../../auth/services/user-state.service';
import { OrderStorageService } from '../../orders/services/order-storage.service';

@Component({
  selector: 'app-delivery-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './delivery-address.component.html',
  styleUrl: './delivery-address.component.scss',
})
export class DeliveryAddressComponent {
  private checkoutService = inject(PaymentService);
  private cartState = inject(CartStateService).state;
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserStateService);
  private orderService = inject(OrderService);
  private deliveryAddressService = inject(DeliveryAddressService);
  private orderStorageService = inject(OrderStorageService);
  public formDeliveryAddress = this.formBuilder.group({
    nombre: 'Gian Martin Hermenegildo',
    direccion: 'Av calle 5 - Los olivos',
    ciudad: 'Lima',
    codigoPostal: '1123',
    numeroDni: '12345678',
  });

  onContinue() {
    console.log('Continue');
    if (this.formDeliveryAddress.invalid || !this.userService.getUser()?.id) {
      return;
    }
    const deliveryAddress = {
      nombre: this.formDeliveryAddress.value.nombre ?? '',
      direccion: this.formDeliveryAddress.value.direccion ?? '',
      ciudad: this.formDeliveryAddress.value.ciudad ?? '',
      codigoPostal: this.formDeliveryAddress.value.codigoPostal ?? '',
      numeroDni: this.formDeliveryAddress.value.numeroDni ?? '',
      clienteId: this.userService.getUser()?.id ?? '',
    };
    this.deliveryAddressService
      .registerDeliveryAddress(deliveryAddress)
      .subscribe({
        next: (response) => {
          console.log('Dirección de entrega registrada');

          const idDireccionEntrega = response.id;
          const clienteId = this.userService.getUser()?.id ?? '1';
          const cart = this.cartState.products();
          const lineItems = cart.map(({ product, quantity }) => ({
            idProducto: product.id,
            cantidad: quantity,
          }));
          this.createOrder({
            idDireccionEntrega,
            clienteId,
            productos: lineItems,
          });
          // this.redirectToCheckout();
        },
        error: (error) => {
          console.error('Error registrando dirección de entrega:', error);
        },
      });
  }

  createOrder(order: OrderProductRequest) {
    this.orderService.createOrder(order).subscribe({
      next: (data) => {
        console.log('Orden creada:', data);
        this.orderStorageService.setOrderId(data.id);
        this.redirectToCheckout();
      },
      error: (error) => {
        console.error('Error creando la orden:', error);
      },
    });
  }

  redirectToCheckout() {
    const cart = this.cartState.products();
    const lineItems = cart.map(({ product, quantity }) => ({
      idProducto: product.id,
      cantidad: quantity,
    }));

    const orderId = this.orderStorageService.getOrderId();

    if (!orderId) return;

    this.checkoutService.initiatePaymentSession(orderId, lineItems).subscribe(
      (response) => {
        // Redirigir al formulario de Stripe
        window.location.href = response.url;
      },
      (error) => {
        console.error('Error creando la sesión de Checkout:', error);
      },
    );
  }
}
