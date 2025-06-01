import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { VoiceReaderService } from '../../../shared/data-access/voice-reader.service';
import { ProductDetailSateService } from '../../data-access/proudct-detail-state.service';
import { ProductsService } from '../../data-access/products/products.service'; // Importa el servicio

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  providers: [ProductDetailSateService, VoiceReaderService, ProductsService],
})
export default class ProductDetailComponent implements OnDestroy {
  productDetailState = inject(ProductDetailSateService).state;
  cartState = inject(CartStateService).state;
  voiceReaderService = inject(VoiceReaderService);
  productsService = inject(ProductsService);

  id = input.required<string>();

  private listenerActive = false;
  alertMessage: string | null = null;

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
    });
    // Activar el listener global al crear el componente
    this.activateGlobalKeyListener();
  }

  addToCart() {
    const product = this.productDetailState.product();
    if (!product) return;
    const cantidad = 1;
    this.productsService
      .verificarStock(product.id.toString(), cantidad)
      .subscribe({
        next: (resp) => {
          if (resp.stockDisponible) {
            this.cartState.add({
              product,
              quantity: cantidad,
            });
            this.alertMessage = null;
          } else {
            this.alertMessage =
              'No hay suficiente stock disponible para este producto.';
            setTimeout(() => {
              this.alertMessage = null;
            }, 3000);
          }
        },
        error: () => {
          this.alertMessage = 'Error al verificar el stock.';
        },
      });
  }

  closeAlert() {
    this.alertMessage = null;
  }

  onRead() {
    if (this.voiceReaderService.synth.speaking) {
      this.voiceReaderService.cancel();
      return;
    }
    this.voiceReaderService.speak(
      this.productDetailState.product()?.descripcion ?? '',
    );
  }

  // Listener global para la tecla "r"
  private handleKeydown = (event: KeyboardEvent) => {
    const tag = (event.target as HTMLElement).tagName.toLowerCase();
    if (
      tag !== 'input' &&
      tag !== 'textarea' &&
      tag !== 'button' &&
      (event.key === 'r' || event.key === 'R')
    ) {
      event.preventDefault();
      this.onRead();
    }
  };

  private activateGlobalKeyListener() {
    if (!this.listenerActive) {
      window.addEventListener('keydown', this.handleKeydown);
      this.listenerActive = true;
    }
  }

  private removeGlobalKeyListener() {
    if (this.listenerActive) {
      window.removeEventListener('keydown', this.handleKeydown);
      this.listenerActive = false;
    }
  }

  ngOnDestroy(): void {
    this.voiceReaderService.cancel();
    this.removeGlobalKeyListener();
  }
}
