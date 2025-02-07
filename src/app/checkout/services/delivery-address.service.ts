import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { DeliveryAddressRequest, DeliveryAddressResponse } from '../../shared/interfaces/delivery-address.interface';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressService extends BaseHttpService {

  registerDeliveryAddress(deliveryAddress: DeliveryAddressRequest) {
    return this.http.post<DeliveryAddressResponse>(`${this.apiUrl}/direcciones-entrega`, deliveryAddress);
  }
}
