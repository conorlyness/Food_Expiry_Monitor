import { Component, OnInit, ViewChild } from '@angular/core';
import { mergeMap } from 'rxjs';
import { Entry } from 'src/app/Entry';
import { EntriesService } from 'src/app/services/entries.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
})
export class FoodListComponent implements OnInit {
  public loading = true;
  public errorMsg: string = '';
  public successMsg: string = '';
  public entries: Entry[] = [];
  public columns = ['foodName', 'expirationDate', 'cancel'];

  constructor(private entriesService: EntriesService) {}

  ngOnInit() {
    this.entriesService.getEntries().subscribe(
      (entries) => {
        this.entries = entries;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      }
    );
  }

  deleteEntry(id: string) {
    this.entriesService
      .deleteEntry(id)
      .pipe(mergeMap(() => this.entriesService.getEntries()))
      .subscribe(
        (entries: Entry[]) => {
          this.entries = entries;
          this.successMsg = 'Sucessfully deleted food entry';
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
  }
}
