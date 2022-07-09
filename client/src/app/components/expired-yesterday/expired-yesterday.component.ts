import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap } from 'rxjs';
import { Entry } from 'src/app/Entry';
import { EntriesService } from 'src/app/services/entries.service';

@Component({
  selector: 'app-expired-yesterday',
  templateUrl: './expired-yesterday.component.html',
  styleUrls: ['./expired-yesterday.component.css'],
})
export class ExpiredYesterdayComponent implements OnInit {
  public loading = true;
  public entries: Entry[] = [];
  public columns = ['foodName', 'expirationDate', 'cancel'];

  constructor(
    private entryService: EntriesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.entryService.getExpiredYesterday().subscribe(
      (entries) => {
        this.entries = entries;
        this.loading = false;
        console.log(entries);
      },
      (error: ErrorEvent) => {
        this.openErrorSnackBar(error.error.message, 'Dismiss');
        this.loading = false;
      }
    );
  }

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

  deleteEntry(id: string) {
    this.entryService
      .deleteEntry(id)
      .pipe(mergeMap(() => this.entryService.getExpiredYesterday()))
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
