import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from './../../environments/environment';
import { map, Observable } from 'rxjs';
import { GetAllProductsResponse } from '../../models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Contenty-Type': 'application/json',
      Authorization: `Beare ${this.JWT_TOKEN}`,
    }),
  }
  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
      return this.http.get<Array<GetAllProductsResponse>>(
        `${this.API_URL}/products`,
         this.httpOptions
      ).pipe(map((product) => product.filter((data) => data?.amount > 0)));
  }
}
