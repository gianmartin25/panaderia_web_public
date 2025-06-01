import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { JwtService } from '../../../auth/services/jwt.service';
import { ProductsStateService } from '../../../products/data-access/products-state.service';
import { CartStateService } from '../../data-access/cart-state.service';
import { UserStateService } from '../../../auth/services/user-state.service';
import { UserLocalStorageService } from '../../../auth/services/user-local-storage.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartState = inject(CartStateService).state;
  productsStateService = inject(ProductsStateService);
  userStateService = inject(UserStateService);
  jwtService = inject(JwtService);
  userLocalStorageService = inject(UserLocalStorageService);
  route = inject(Router);

  productSearchForm = new FormGroup({
    productName: new FormControl(''),
  });

  private searchSub?: Subscription;

  ngOnInit() {
    this.searchSub = this.productSearchForm
      .get('productName')!
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.route.navigate(['products'], {
          queryParams: {
            nombre: value,
            page: 1,
            category: this.productsStateService.state.categoriaId(),
          },
        });
      });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }

  onSubmit() {
    console.log(this.productSearchForm.value);
    console.log(this.productsStateService.state.categoriaId());
    console.log(this.productsStateService.state.products());
    this.route.navigate(['products'], {
      queryParams: {
        nombre: this.productSearchForm.value.productName,
        page: 1,
        category: this.productsStateService.state.categoriaId(),
      },
    });
  }

  onLogout() {
    this.cartState.clearCart();
    this.userStateService.setUser(null!);
    this.userLocalStorageService.setUser(null!);
    this.jwtService.saveToken('');
    this.route.navigate(['login']);
    this.cartState.clearCart();
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
