import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  getPages(currentPage: number, totalPages: number): string[] {
    const pages: string[] = [];

    if (currentPage > 3) pages.push('1');
    if (currentPage > 4) pages.push('...');

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(i.toString());
    }

    if (currentPage < totalPages - 3) pages.push('...');
    if (currentPage < totalPages - 2) pages.push(totalPages.toString());

    return pages;
  }
}