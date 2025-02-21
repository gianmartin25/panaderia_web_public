import { Component, inject, OnInit } from '@angular/core';
import { UserStateService } from '../../auth/services/user-state.service';
import { ProductOrder } from '../interfaces/order-product.interface';
import { OrderService } from '../services/order.service';
import { PdfService } from '../../shared/data-access/pdf-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  private userStateService = inject(UserStateService);
  private pdfService = inject(PdfService);

  public ordersProducts: ProductOrder[] = [];

  ngOnInit(): void {
    this.userStateService.getUserObservable().subscribe((user) => {
      if (user) {
        console.log('User id:', user.id);
        this.getOrdersByClientId(+user.id);
      }
    });
  }

  downloadPdf(comprobanteId: number) {
    console.log(this.userStateService.getUser()?.tipoCliente);
    if (this.userStateService.getUser()?.tipoCliente === 'empresa') {
      this.pdfService.downloadPdfFactura(comprobanteId);
    } else {
      this.pdfService.downloadPdfBoleta(comprobanteId);
    }
  }

  getOrdersByClientId(clientId: number) {
    return this.orderService.getOrdersByClientId(clientId).subscribe({
      next: (data) => {
        this.ordersProducts = data;
      },
      error: (error) => {
        console.error('Error al obtener las ordenes:', error);
      },
    });
  }
}
