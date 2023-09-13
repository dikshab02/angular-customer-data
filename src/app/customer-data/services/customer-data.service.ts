import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomerData } from 'src/app/models/customer-data';
import { CUSTOMER_DATA_API_URL } from 'src/app/utility/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  constructor(private http: HttpClient) {}

  getCustomerData(): Observable<ICustomerData[]> {
    return this.http.get<ICustomerData[]>(CUSTOMER_DATA_API_URL)
  }
}
