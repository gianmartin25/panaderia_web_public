import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { ProductDetailSateService } from '../../data-access/proudct-detail-state.service';
import { CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { VoiceReaderService } from '../../../shared/data-access/voice-reader.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail.component.html',
  providers: [ProductDetailSateService,VoiceReaderService],
})
export default class ProductDetailComponent implements OnDestroy {
  productDetailState = inject(ProductDetailSateService).state;
  cartState = inject(CartStateService).state;
  voiceReaderService = inject(VoiceReaderService);

  id = input.required<string>();

  constructor() {
    effect(() => {
      this.productDetailState.getById(this.id());
    });
  }

  addToCart() {
    this.cartState.add({
      product: this.productDetailState.product()!,
      quantity: 1,
    });
  }

  onRead(){
    if(this.voiceReaderService.synth.speaking){
      this.voiceReaderService.cancel();
      return;
    }
    console.log(this.productDetailState.product()?.descripcion);
    this.voiceReaderService.speak(this.productDetailState.product()?.descripcion ?? '');
  }

  ngOnDestroy(): void {
    this.voiceReaderService.cancel();
  }
}
