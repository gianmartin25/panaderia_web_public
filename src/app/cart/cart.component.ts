import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule ,CartItemComponent,RouterModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styles: ``,
})
export default class CartComponent {
  state = inject(CartStateService).state;

  // Modal state
  showConfirmModal = false;
  productToRemoveId: number | null = null;

  onRemove(id: number) {
    this.productToRemoveId = id;
    this.showConfirmModal = true;
  }

  confirmRemove() {
    if (this.productToRemoveId !== null) {
      this.state.remove(this.productToRemoveId);
    }
    this.closeModal();
  }

  closeModal() {
    this.showConfirmModal = false;
    this.productToRemoveId = null;
  }

  onIncrease(product: ProductItemCart) {
    this.state.udpate({
      product: product.product,
      quantity: product.quantity + 1,
    });
  }

  onDecrease(product: ProductItemCart) {
    this.state.udpate({
      ...product,
      quantity: product.quantity - 1,
    });
  }
}
