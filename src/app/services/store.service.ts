import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const STORE_BASE_URL = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  // `${STORE_BASE_URL}/products?limit=${limit}&sort=${sort}`
  constructor(private http: HttpClient) {}
  getAllProducts(limit: number = 12, sort = 'desc',category:string =''): Observable<Array<Product>> {
   
    return this.http.get<Array<Product>>(
      `${STORE_BASE_URL}/products${category ? '/category/'+category:''}?limit=${limit}&sort=${sort}`
    );
  }
  getProductsByCategory(category: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${STORE_BASE_URL}/products/category/${category}`
    );
  }
  getAllCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }
}
