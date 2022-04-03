import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/Entry';
import { EntriesService } from 'src/app/services/entries.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-food-entry',
  templateUrl: './food-entry.component.html',
  styleUrls: ['./food-entry.component.css'],
})
export class FoodEntryComponent implements OnInit {
  public successMsg: string = '';
  public errorMsg: string = '';
  public foodName: string = '';
  public expirationDate: string = '';

  constructor(
    private entryService: EntriesService,
    private _snackBar: MatSnackBar
  ) {}

  openSuccessSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

  openErrorSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['red-snackbar'],
    });
  }

  ngOnInit(): void {}

  createEntry() {
    this.successMsg = '';
    this.errorMsg = '';
    this.entryService
      .createFoodEntry(this.foodName, this.expirationDate)
      .subscribe(
        (createdEntry: Entry) => {
          this.expirationDate = '';
          this.foodName = '';
          this.successMsg = `Sucessfully added food entry`;
          this.openSuccessSnackBar('Sucessfully added food entry', 'Dismiss');
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
          this.openErrorSnackBar(error.error.message, 'Dismiss');
        }
      );
  }
}
