import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CartItemComponent } from './cart-item.component';
import { CurrencyPipe } from '@angular/common';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CartItemComponent],
      declarations: [],
      providers: [CurrencyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.productCartItem = {
      product: {
        id: 1,
        nombre: 'Pan',
        totalCantidad: 10,
        categoriaId: 2,
        categoriaNombre: 'Bakery',
        proveedorId: 3,
        proveedorNombre: 'Proveedor',
        descripcion: 'Test Product',
        imageUrl: 'http://example.com/pan.jpg',
        precio: 100,
      },
      quantity: 3,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product description', () => {
    const descriptionElement = fixture.debugElement.query(
      By.css('#id-descripcion'),
    ).nativeElement;
    expect(descriptionElement.textContent).toContain('Test Product');
  });

  it('should display product price', () => {
    const priceElement = fixture.debugElement.query(
      By.css('.text-base.font-bold'),
    ).nativeElement;
    expect(priceElement.textContent).toContain('S/100');
  });

  it('should emit onRemove event when remove button is clicked', () => {
    spyOn(component.remove, 'emit');
    const removeButton = fixture.debugElement.query(
      By.css('button.text-red-600'),
    ).nativeElement;
    removeButton.click();
    expect(component.remove.emit).toHaveBeenCalledWith(1);
  });

  it('should emit onIncrease event when increment button is clicked', () => {
    spyOn(component.increase, 'emit');
    const incrementButton = fixture.debugElement.query(
      By.css('#increment-button'),
    ).nativeElement;
    incrementButton.click();
    expect(component.increase.emit).toHaveBeenCalledWith(
      component.productCartItem
    );
  });

  it('should emit onDecrease event when decrement button is clicked', () => {
    spyOn(component.decrease, 'emit');
    const decrementButton = fixture.debugElement.query(
      By.css('#decrement-button'),
    ).nativeElement;
    decrementButton.click();
    expect(component.decrease.emit).toHaveBeenCalledWith(
      component.productCartItem,
    );
  });

  it('should disable decrement button when quantity is 1', () => {
    component.productCartItem.quantity = 1;
    fixture.detectChanges();
    const decrementButton = fixture.debugElement.query(
      By.css('#decrement-button'),
    ).nativeElement;
    expect(decrementButton.disabled).toBeTruthy();
  });

  it('should disable increment button when quantity is 5', () => {
    component.productCartItem.quantity = 5;
    fixture.detectChanges();
    const incrementButton = fixture.debugElement.query(
      By.css('#increment-button'),
    ).nativeElement;
    expect(incrementButton.disabled).toBeTruthy();
  });
});
