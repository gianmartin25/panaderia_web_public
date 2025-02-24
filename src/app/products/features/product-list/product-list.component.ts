import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { ProductCategory } from '../../../shared/interfaces/product-category.interface';
import { Product } from '../../../shared/interfaces/product.interface';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { ProductCategoryService } from '../../data-access/product-category.service';
import { ProductsStateService } from '../../data-access/products-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
    RouterModule,
    PaginationComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [],
})
export default class ProductListComponent implements OnInit {
  cartState = inject(CartStateService).state;
  productCategoryService = inject(ProductCategoryService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  currentPage = computed(() => this.productsStateService.state.currentPage());
  totalPages = computed(() => this.productsStateService.state.totalPages());
  categories: ProductCategory[] = [];
  categoriaId = computed(() => this.productsStateService.state.categoriaId());

  addToCart(product: Product) {
    this.cartState.add({
      product,
      quantity: 1,
    });
  }

  constructor(public productsStateService: ProductsStateService) {
    // Efecto para actualizar las páginas cuando el estado cambia
  }
  ngOnInit(): void {
    this.getCategories();
    this.route.queryParamMap.subscribe((params) => {
      const pages = params.get('page') ?? '1';
      const size = params.get('size') ?? '10';
      const categoriaId = params.get('category') ?? '1';
      const nombre = params.get('nombre') ?? '';
      this.productsStateService.changePage({
        page: parseInt(pages),
        size: parseInt(size),
        categoriaId: parseInt(categoriaId),
        nombre,
      });
    });
  }

  public getCategories() {
    return this.productCategoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  changePage(page: number): void {
    this.router.navigate(['/products'], {
      queryParams: { page, size: 10, category: this.categoriaId() },
    });
  }
}
