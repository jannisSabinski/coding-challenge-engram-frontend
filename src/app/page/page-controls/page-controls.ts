import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  LucideChevronDown,
  LucideChevronLeft,
  LucideChevronRight,
  LucideChevronsLeft,
  LucideChevronsRight,
} from '@lucide/angular';

@Component({
  selector: 'app-page-controls',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LucideChevronDown,
    LucideChevronRight,
    LucideChevronsRight,
    LucideChevronLeft,
    LucideChevronsLeft,
  ],
  templateUrl: './page-controls.html',
  styleUrl: './page-controls.css',
})
export class PageControls {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() totalItems = 0;

  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  itemsPerPageControl = new FormControl<number>(10);

  options = [
    { value: 1, viewValue: '1' },
    { value: 10, viewValue: '10' },
    { value: 20, viewValue: '20' },
    { value: 50, viewValue: '50' },
  ];

  ngOnInit() {
    this.itemsPerPageControl.setValue(10, { emitEvent: false });

    this.itemsPerPageControl.valueChanges.subscribe((value) => {
      if (value != null) {
        this.itemsPerPageChange.emit(value);
      }
    });
  }

  goToPage(page: number) {
    this.pageChange.emit(page);
  }

  nextPage() {
    this.pageChange.emit(this.currentPage + 1);
  }

  previousPage() {
    this.pageChange.emit(this.currentPage - 1);
  }

  firstPage() {
    this.pageChange.emit(1);
  }

  lastPage() {
    this.pageChange.emit(this.totalPages);
  }

  getResultRange(): string {
    const value = this.itemsPerPageControl.value!;
    const start = (this.currentPage - 1) * value + 1;
    const end = Math.min(this.currentPage * value, this.totalItems);
    return `${start} - ${end} of ${this.totalItems}`;
  }

  getPageRange(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const range: number[] = [];

    if (totalPages <= 5) {
      // If there are 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }
    // More than 5 pages
    if (currentPage <= 3) {
      // Near the start
      range.push(1, 2, 3, 4, 5);
      return range;
    }
    if (currentPage >= totalPages - 2) {
      // Near the end
      for (let i = totalPages - 4; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }
    // Somewhere in the middle
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      range.push(i);
    }
    return range;
  }
}
