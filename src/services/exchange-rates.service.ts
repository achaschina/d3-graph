import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

const data = [
  { date: '2019-12-14', value: '23.6000000' },
  { date: '2019-12-15', value: '23.6000000' },
  { date: '2019-12-16', value: '23.5500000' },
  { date: '2019-12-17', value: '23.5500000' },
  { date: '2019-12-18', value: '23.5000000' },
  { date: '2019-12-19', value: '23.4000000' },
  { date: '2019-12-20', value: '23.3700000' },
  { date: '2019-12-21', value: '23.4000000' },
  { date: '2019-12-22', value: '23.4000000' },
  { date: '2019-12-23', value: '23.3500000' },
  { date: '2019-12-24', value: '23.2500000' },
  { date: '2019-12-25', value: '23.2500000' },
  { date: '2019-12-26', value: '23.6500000' },
  { date: '2019-12-27', value: '24.1600000' },
  { date: '2019-12-28', value: '25.0000000' },
  { date: '2019-12-29', value: '25.0000000' },
  { date: '2019-12-30', value: '24.4500000' },
  { date: '2019-12-31', value: '24.4500000' },
]

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  ratesData$: Observable<any>;

  private ratesDataSubject = new BehaviorSubject<any>(null);
  private ratesDataState: any;

  constructor(private http: HttpClient) {
    this.ratesDataSubject.next(this.ratesDataState);
    this.ratesData$ = this.ratesDataSubject.asObservable();
  }

  getExchangeRates() {
    return of(data);
  }

}
