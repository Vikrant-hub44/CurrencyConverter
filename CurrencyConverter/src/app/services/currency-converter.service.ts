import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
/**
 * Currency convert service
 */
export class CurrencyConverterService {
  pipe = new DatePipe('en-US');
  constructor(private http: HttpClient) { }

   /**
   * Created by: Vikrant Verma
   * Created on: 2022-07-20
   * Purpose: Service to fetch exchange rate according to date.
   * Parameters: 
   * from: string type, having from currency code like USD, INR
   * to: string type, having to currency code like CAD or vice versa
   * date: string type, having selected date of which want to fetch date
   * Returns: It return JSON object return by Bank of Canada API
   */
  getExchangeRate(from: string, to: string, date: string | null) {
    date = this.pipe.transform(date, "YYYY-MM-dd");
    return this.http.get(`${environment.apiUrl}/observations/FX${from}${to}?start_date=${date}&end_date=${date}`);
  }

  /**
   * Created by: Vikrant Verma
   * Created on: 2022-07-20
   * Purpose: convert and return the converted amount as per exchange rate
   * Parameters: 
   * ammount: number type, amount enter by user from UI
   * currencyRate: number type, rate return by exchange rate API
   * Returns: return a decimal value upto 4 decimal places
   */
  convertCurrency(ammount: number, currencyRate: number) {
    if (currencyRate !== undefined
      && currencyRate > 0) {
      return parseFloat((ammount * currencyRate).toFixed(4));
    }
    return 0;
  }
}
