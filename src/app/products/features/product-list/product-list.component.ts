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
import { ProductsService } from '../../data-access/products/products.service'; // Importa el servicio

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
// ...existing imports...
export default class ProductListComponent implements OnInit {
  cartState = inject(CartStateService).state;
  productCategoryService = inject(ProductCategoryService);
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  currentPage = computed(() => this.productsStateService.state.currentPage());
  totalPages = computed(() => this.productsStateService.state.totalPages());
  categories: ProductCategory[] = [];
  categoryId = computed(() => this.productsStateService.state.categoriaId());
  sortValue = 'precio-asc';
  showSortOptions = false;
  alertMessage: string | null = null;
  alertProductId: number | null = null; // <-- Nuevo: para saber a qué producto mostrar la alerta

  addToCart(product: Product) {
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
            this.alertProductId = null;
          } else {
            this.alertMessage =
              'No hay suficiente stock disponible para este producto.';
            this.alertProductId = product.id;
            setTimeout(() => {
              this.alertMessage = null;
              this.alertProductId = null;
            }, 3000); 
          }
        },
        error: () => {
          this.alertMessage = 'Error al verificar el stock.';
          this.alertProductId = product.id;
        },
      });
  }

  closeAlert() {
    this.alertMessage = null;
    this.alertProductId = null;
  }

  constructor(public productsStateService: ProductsStateService) {}

  ngOnInit(): void {
    this.getCategories();
    this.route.queryParamMap.subscribe((params) => {
      const pages = params.get('page') ?? '1';
      const size = params.get('size') ?? '10';
      const categoriaId = params.get('category') ?? '1';
      const nombre = params.get('nombre') ?? '';
      const sortBy = params.get('sortBy') ?? 'precio';
      const sortDirection = params.get('sortDirection') ?? 'asc';

      if (sortBy === 'precio' && sortDirection === 'asc')
        this.sortValue = 'precio-asc';
      else if (sortBy === 'precio' && sortDirection === 'desc')
        this.sortValue = 'precio-desc';
      else if (sortBy === 'nombre' && sortDirection === 'asc')
        this.sortValue = 'nombre-asc';
      else if (sortBy === 'nombre' && sortDirection === 'desc')
        this.sortValue = 'nombre-desc';

      this.productsStateService.changePage({
        page: parseInt(pages),
        size: parseInt(size),
        categoriaId: parseInt(categoriaId),
        nombre,
        sortBy,
        sortDirection,
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
      queryParams: {
        ...this.route.snapshot.queryParams,
        page,
        size: 10,
        category: this.categoryId(),
        sortBy: this.getSortBy(),
        sortDirection: this.getSortDirection(),
      },
    });
  }

  onSortChange(value: string) {
    this.sortValue = value;
    this.showSortOptions = false;
    const [sortBy, sortDirection] = value.split('-');
    const queryParams = {
      ...this.route.snapshot.queryParams,
      sortBy,
      sortDirection,
      page: 1,
    };
    this.router.navigate(['/products'], { queryParams });
  }

  getSortBy() {
    return this.sortValue.split('-')[0];
  }

  getSortDirection() {
    return this.sortValue.split('-')[1];
  }
}
