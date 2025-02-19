import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { JwtService } from '../../../auth/services/jwt.service';
import { ProductsSateService } from '../../../products/data-access/products-state.service';
import { CartStateService } from '../../data-access/cart-state.service';
import { UserStateService } from '../../../auth/services/user-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  cartState = inject(CartStateService).state;
  productsStateService = inject(ProductsSateService);
  userStateService = inject(UserStateService);
  jwtService = inject(JwtService);
  route = inject(Router);


  productSearchForm = new FormGroup({
    productName: new FormControl(''),
  });

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

  onLogout(){
    this.userStateService.setUser(null!);
    this.jwtService.saveToken('');
    this.route.navigate(['login']);
    this.cartState.clearCart();
  }


  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
