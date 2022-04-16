import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry } from '../Entry';
import * as moment from 'moment'; //in your component

@Injectable({
  providedIn: 'root',
})
export class EntriesService {
  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  //gets all the data from the mongodb
  getEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.BASE_URL}/foodExpiration`);
  }

  //get the food expiring today
  getExpiringToday(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.BASE_URL}/foodExpiration/today`);
  }

  //get the food expiring soon (within 3 days)
  getExpiringSoon(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.BASE_URL}/foodExpiration/3days`);
  }

  //get the food that expired yesterday
  getExpiredYesterday(): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${this.BASE_URL}/foodExpiration/yesterday`);
  }

  //create new food entry
  createFoodEntry(foodName: string, expirationDate: string): Observable<Entry> {
    return this.http.post<Entry>(`${this.BASE_URL}/foodExpiration`, {
      foodName,
      expirationDate: moment(expirationDate).format('DD/MM/YYYY'),
    });
  }

  //delete a food entry
  deleteEntry(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/foodExpiration/${id}`);
  }
}
