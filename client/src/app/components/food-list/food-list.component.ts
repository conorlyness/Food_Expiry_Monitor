import { Component, OnInit, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs';
import { Entry } from 'src/app/Entry';
import { EntriesService } from 'src/app/services/entries.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit {
  public loading = true;
  public entries: Entry[] = [];
  public columns = ['foodName', 'expirationDate', 'cancel'];

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

  ngOnInit() {
    this.entryService.getEntries().subscribe(
      (entries) => {
        this.entries = entries;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.openErrorSnackBar(error.error.message, 'Dismiss');
        this.loading = false;
      }
    );
  }

  deleteEntry(id: string) {
    this.entryService
      .deleteEntry(id)
      .pipe(mergeMap(() => this.entryService.getEntries()))
      .subscribe(
        (entries: Entry[]) => {
          this.entries = entries;
          this.openSuccessSnackBar('Sucessfully deleted food entry', 'Dismiss');
        },
        (error: ErrorEvent) => {
          this.openErrorSnackBar(error.error.message, 'Dismiss');
        }
      );
  }
}
