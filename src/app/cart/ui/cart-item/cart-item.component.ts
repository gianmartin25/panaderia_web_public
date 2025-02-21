import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductItemCart } from '../../../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe, RouterModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {
  @Input() productCartItem!: ProductItemCart;

  @Output() remove = new EventEmitter<number>();

  @Output() increase = new EventEmitter<ProductItemCart>();

  @Output() decrease = new EventEmitter<ProductItemCart>();
}