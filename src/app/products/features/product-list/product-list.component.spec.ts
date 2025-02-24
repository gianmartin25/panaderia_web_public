// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs';
// import ProductListComponent from './product-list.component';
// import { ProductCategoryService } from '../../data-access/product-category.service';
// import { ProductsStateService } from '../../data-access/products-state.service';
// import { CartStateService } from '../../../shared/data-access/cart-state.service';
// import { ProductCategory } from '../../../shared/interfaces/product-category.interface';

// describe('ProductListComponent', () => {
//   let component: ProductListComponent;
//   let fixture: ComponentFixture<ProductListComponent>;
//   let productCategoryService: jasmine.SpyObj<ProductCategoryService>;
//   let productsStateService: jasmine.SpyObj<ProductsStateService>;
//   let cartStateService: jasmine.SpyObj<CartStateService>;

//   beforeEach(async () => {
//     const productCategoryServiceSpy = jasmine.createSpyObj(
//       'ProductCategoryService',
//       ['getCategories'],
//     );
//     const productsStateServiceSpy = jasmine.createSpyObj(
//       'ProductsStateService',
//       ['changePage', 'state'],
//     );
//     const cartStateServiceSpy = jasmine.createSpyObj('CartStateService', [
//       'state',
//       'add',
//     ]);

//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule, HttpClientTestingModule],
//       declarations: [ProductListComponent],
//       providers: [
//         {
//           provide: ProductCategoryService,
//           useValue: productCategoryServiceSpy,
//         },
//         { provide: ProductsStateService, useValue: productsStateServiceSpy },
//         { provide: CartStateService, useValue: cartStateServiceSpy },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ProductListComponent);
//     component = fixture.componentInstance;
//     productCategoryService = TestBed.inject(
//       ProductCategoryService,
//     ) as jasmine.SpyObj<ProductCategoryService>;
//     productsStateService = TestBed.inject(
//       ProductsStateService,
//     ) as jasmine.SpyObj<ProductsStateService>;
//     cartStateService = TestBed.inject(
//       CartStateService,
//     ) as jasmine.SpyObj<CartStateService>;
//   });

//   it('debería crear el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debería obtener las categorías al inicializar', () => {
//     const mockCategories: ProductCategory[] = [{ id: 1, nombre: 'Pan' }];
//     productCategoryService.getCategories.and.returnValue(of(mockCategories));

//     component.ngOnInit();

//     expect(component.categories).toEqual(mockCategories);
//     expect(productCategoryService.getCategories).toHaveBeenCalled();
//   });

//   it('debería cambiar la página correctamente', () => {
//     const navigateSpy = spyOn(component.router, 'navigate');

//     component.changePage(2);

//     expect(navigateSpy).toHaveBeenCalledWith(['/products'], {
//       queryParams: { page: 2, size: 10, category: component.categoriaId() },
//     });
//   });

//   it('debería agregar un producto al carrito', () => {
//     const mockProduct = {
//       id: 1,
//       nombre: 'Producto 1',
//       descripcion: 'Descripción del producto 1',
//       precio: 100,
//       totalCantidad: 10,
//       imageUrl: 'http://example.com/image.jpg',
//       categoriaId: 1,
//       categoriaNombre: 'Categoría 1',
//       proveedorId: 1,
//       proveedorNombre: 'Proveedor 1',
//     };
//     component.addToCart(mockProduct);

//     expect(cartStateService.state.add).toHaveBeenCalledWith({
//       product: mockProduct,
//       quantity: 1,
//     });
//   });
// });
