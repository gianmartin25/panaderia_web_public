import { TestBed } from '@angular/core/testing';

import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver las páginas correctas cuando currentPage es 1 y totalPages es 5', () => {
    const pages = service.getPages(1, 5);
    expect(pages).toEqual(['1', '2', '3', '...', '5']);
  });

  it('debería devolver las páginas correctas cuando currentPage es 3 y totalPages es 5', () => {
    const pages = service.getPages(3, 5);
    expect(pages).toEqual(['1', '2', '3', '4', '5']);
  });

  it('debería devolver las páginas correctas cuando currentPage es 5 y totalPages es 5', () => {
    const pages = service.getPages(5, 5);
    expect(pages).toEqual(['1', '...', '3', '4', '5']);
  });

  it('debería devolver las páginas correctas cuando currentPage es 6 y totalPages es 10', () => {
    const pages = service.getPages(6, 10);
    expect(pages).toEqual(['1', '...', '4', '5', '6', '7', '8', '...', '10']);
  });

  it('debería devolver las páginas correctas cuando currentPage es 10 y totalPages es 10', () => {
    const pages = service.getPages(10, 10);
    expect(pages).toEqual(['1', '...', '8', '9', '10']);
  });

  it('debería devolver las páginas correctas cuando currentPage es 1 y totalPages es 1', () => {
    const pages = service.getPages(1, 1);
    expect(pages).toEqual(['1']);
  });

  it('debería devolver las páginas correctas cuando currentPage es 4 y totalPages es 10', () => {
    const pages = service.getPages(4, 10);
    expect(pages).toEqual(['1', '2', '3', '4', '5', '6', '...', '10']);
  });

  it('debería devolver las páginas correctas cuando currentPage es 7 y totalPages es 10', () => {
    const pages = service.getPages(7, 10);
    expect(pages).toEqual(['1', '...', '5', '6', '7', '8', '9', '10']);
  });

  it('debería devolver las páginas correctas cuando currentPage es 2 y totalPages es 5', () => {
    const pages = service.getPages(2, 5);
    expect(pages).toEqual(['1', '2', '3', '4', '5']);
  });

  it('debería devolver las páginas correctas cuando currentPage es 9 y totalPages es 10', () => {
    const pages = service.getPages(9, 10);
    expect(pages).toEqual(['1', '...', '7', '8', '9', '10']);
  });
});
