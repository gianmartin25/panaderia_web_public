import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderStorageService {
  private readonly orderIdKey = 'orderId';

  setOrderId(orderId: number): void {
    localStorage.setItem(this.orderIdKey, orderId.toString());
  }

  getOrderId(): number | null {
    return +localStorage.getItem(this.orderIdKey)!;
  }

  clearOrderId(): void {
    localStorage.removeItem(this.orderIdKey);
  }
}