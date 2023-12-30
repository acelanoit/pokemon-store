import { Component } from '@angular/core';

// Use a constant to store the row height for each number of columns.
// Use the TypeScript Index Signature to specify the type for the property name inside an object
const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  type = '';

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;

    // Set the row height based on the number of columns
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowType(newType: string): void {
    this.type = newType;
  }
}
