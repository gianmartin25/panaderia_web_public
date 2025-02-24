import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  private _currentPage!: number;
  private _totalPages!: number;

  @Input()
  set currentPage(value: number) {
    this._currentPage = value;
    this.updatePages();
  }

  get currentPage(): number {
    return this._currentPage;
  }

  @Input()
  set totalPages(value: number) {
    this._totalPages = value;
    this.updatePages();
  }

  get totalPages(): number {
    return this._totalPages;
  }

  @Output() changePage = new EventEmitter<number>();

  pages: string[] = [];

  constructor(private router: Router, private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.updatePages();
  }

  navigateToPage(page: number): void {
    this.changePage.emit(page);
  }

  private updatePages(): void {
    this.pages = this.paginationService.getPages(this.currentPage, this.totalPages);
  }
}