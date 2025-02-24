import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationService } from '../../services/pagination.service';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let paginationService: jasmine.SpyObj<PaginationService>;

  beforeEach(async () => {
    const paginationServiceSpy = jasmine.createSpyObj('PaginationService', [
      'getPages',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [],
      providers: [
        { provide: PaginationService, useValue: paginationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    paginationService = TestBed.inject(
      PaginationService,
    ) as jasmine.SpyObj<PaginationService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería actualizar las páginas cuando se establece currentPage', () => {
    paginationService.getPages.and.returnValue(['1', '2', '3']);
    component.currentPage = 1;
    component.totalPages = 3;

    expect(component.pages).toEqual(['1', '2', '3']);
    expect(paginationService.getPages).toHaveBeenCalledWith(1, 3);
  });

  it('debería emitir el evento changePage cuando se navega a una página', () => {
    spyOn(component.changePage, 'emit');

    component.navigateToPage(2);

    expect(component.changePage.emit).toHaveBeenCalledWith(2);
  });

  it('debería actualizar las páginas cuando se establece totalPages', () => {
    paginationService.getPages.and.returnValue(['1', '2', '3']);
    component.currentPage = 1;
    component.totalPages = 3;

    expect(component.pages).toEqual(['1', '2', '3']);
    expect(paginationService.getPages).toHaveBeenCalledWith(1, 3);
  });

  it('deberia actualizar a la siguiente pagina al hacer click en el boton siguiente', () => {
    spyOn(component.changePage, 'emit');
    component.currentPage = 2;
    component.totalPages = 3;

    const nextButton = fixture.nativeElement.querySelector('#next-button');
    nextButton.click();

    expect(component.changePage.emit).toHaveBeenCalledWith(3);
  });
});
