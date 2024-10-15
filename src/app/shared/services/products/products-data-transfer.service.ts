import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from './../../../models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public productsDataEmittir$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);
  public productsDatas : Array<GetAllProductsResponse> = [];

  setProductsDatas(products: Array<GetAllProductsResponse>): void{
    if(products){
      this.productsDataEmittir$.next(products);
      this.getProductsData();
    }
  }

  getProductsData() {
    this.productsDataEmittir$.pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
    )
      .subscribe({
        next: (response) => {
            if(response){
              this.productsDatas = response;
            }
          },
      });
      return this.productsDatas;
  }

}
