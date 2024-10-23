import {DestroyRef, inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StatisticDays} from "../domain/StatisticDays";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private httpClient: HttpClient = inject(HttpClient);
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
  }

  getStatistics(): Observable<StatisticDays[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return this.httpClient.get<StatisticDays[]>('http://localhost:8090/getstatdata');
  }

}
