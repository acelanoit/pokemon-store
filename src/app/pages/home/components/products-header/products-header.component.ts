import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  sort!: SafeHtml; // Use ! to assert that sort will be defined before it's used, or else TS will complain
  itemsShowCount = 30;

  constructor(private domSanitizer: DomSanitizer) {
    // Set the default value for the sort variable
    this.setSort('asc');
  }

  private setSort(order: 'asc' | 'desc'): void {
    const arrowIcon = order === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down';
    const orderText = order === 'asc' ? '1-' + this.itemsShowCount : this.itemsShowCount + '-1';

    const htmlString = `<pre>Sort by:<i class="material-icons align-[-8px]">${arrowIcon}</i>${orderText}<i class="material-icons align-[-8px]">expand_more</i></pre>`;

    this.sort = this.domSanitizer.bypassSecurityTrustHtml(htmlString);
  }

  onSortUpdated(newSort: 'asc' | 'desc'): void {
    this.setSort(newSort);
    this.sortChange.emit(newSort);
  }

  onItemsUpdated(newCount: number): void {
    this.itemsShowCount = newCount;
    this.itemsCountChange.emit(newCount);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
