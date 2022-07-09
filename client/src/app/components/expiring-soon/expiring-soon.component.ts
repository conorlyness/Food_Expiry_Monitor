import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap } from 'rxjs';
import { Entry } from 'src/app/Entry';
import { EntriesService } from 'src/app/services/entries.service';

@Component({
  selector: 'app-expiring-soon',
  templateUrl: './expiring-soon.component.html',
  styleUrls: ['./expiring-soon.component.css'],
})
export class ExpiringSoonComponent implements OnInit {
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
    this.entryService.getExpiringSoon().subscribe(
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
      .pipe(mergeMap(() => this.entryService.getExpiringSoon()))
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
