import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { OrderProductRequest } from '../interfaces/order-product-request.interface';
import { ProductOrder } from '../interfaces/order-product.interface';
import { OrderStorageService } from './order-storage.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseHttpService {
  private orderStorageService = inject(OrderStorageService);

  getOrdersByClientId(clientId: number) {
    return this.http.get<ProductOrder[]>(
      `${this.apiUrl}/ordenes/cliente/${clientId}`,
    );
  }

  createOrder(order: OrderProductRequest) {
    return this.http.post<ProductOrder>(`${this.apiUrl}/ordenes`, order).pipe(
      tap((productOrder: ProductOrder) => {
        this.orderStorageService.setOrderId(productOrder.id);
      }),
    );
  }
}
