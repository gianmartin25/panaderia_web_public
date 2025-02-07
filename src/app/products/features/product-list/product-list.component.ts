import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { ProducCategory } from '../../../shared/interfaces/product-category.interface';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductCategoryService } from '../../data-access/product-category.service';
import { ProductsSateService } from '../../data-access/products-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CheckoutService } from '../../../shared/data-access/checkout.service';
import { VoiceReaderService } from '../../../shared/data-access/voice-reader.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [],
})
export default class ProductListComponent implements OnInit {
  // productsStateService = inject(ProductsSateService);
  cartState = inject(CartStateService).state;
  productCategoryService = inject(ProductCategoryService);
  route = inject(ActivatedRoute);
  private voiceReaderService = inject(VoiceReaderService);
  currentPage = computed(() => this.productsStateService.state.currentPage());
  totalPages = computed(() => this.productsStateService.state.totalPages());
  pages = computed(() => this.getPages(this.currentPage(), this.totalPages()));
  categories: ProducCategory[] = [];
  categoriaId = 1;



  // changePage() {
  //   const page = this.productsStateService.state.currentPage() + 1;
  //   this.productsStateService.changePage$.next(page);
  // }

  addToCart(product: Product) {
    this.cartState.add({
      product,
      quantity: 1,
    });
  }

  constructor(public productsStateService: ProductsSateService,private checkoutService: CheckoutService) {
    // Efecto para actualizar las páginas cuando el estado cambia
    effect(() => {
      this.pages();
    });
  }
  ngOnInit(): void {
    //capturar la pagina de los query params
    // this.voiceReaderService.speak('Bienvenido a la tienda de productos');
    this.getCategories();
    this.route.queryParamMap.subscribe((params) => {
      const pages = params.get('page') ?? '1';
      const size = params.get('size') ?? '10';
      const categoriaId = params.get('category') ?? '1';
      const nombre = params.get('nombre') ?? '';
      console.log(nombre);
      this.categoriaId = parseInt(categoriaId);
      this.productsStateService.changePage({ page: parseInt(pages), size: parseInt(size), categoriaId: parseInt(categoriaId), nombre });
    });
  }
  // onPageChange(page: number, size: number, categoriaId: number): void {
  //   if (page > 0 && page <= this.totalPages()) {
  //     this.productsStateService.changePage({ page, size, categoriaId });
  //   }
  // }

  public getCategories() {
    return this.productCategoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  private getPages(currentPage: number, totalPages: number): string[] {
    // const pagesToShow = 5; // Número de páginas visibles a cada lado del actual
    const pages: string[] = [];

    if (currentPage > 3) pages.push('1');
    if (currentPage > 4) pages.push("...");

    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(i.toString());
    }

    if (currentPage < totalPages - 3) pages.push("...");
    if (currentPage < totalPages - 2) pages.push(totalPages.toString());

    return pages;
  }

  checkout() {
    this.checkoutService.redirectToCheckout(5000); // Monto en centavos (50.00 USD)
  }


}
