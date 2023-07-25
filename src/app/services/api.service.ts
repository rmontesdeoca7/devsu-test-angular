import { EventEmitter, Injectable, Output, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { Product } from '../interfaces/products-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Output() dispachSearchTerm =  new EventEmitter<string>();

  private readonly baseUrl: string = environment.baseUrl;
  private readonly authorId: string = environment.authorId;

  private http = inject( HttpClient );
  private headers = new HttpHeaders()
    .set( 'authorId', this.authorId );

  private products: Product[] = [];

  constructor() {}

  get Products() {
    return this.products;
  }

  getProducts (): Observable<Product[]> {
    const url = `${this.baseUrl}/bp/products`;
    return this.http.get<Product[]>(url, { headers: this.headers })
      .pipe(
        tap(products => this.products = products),
        catchError(err => throwError(() => err.error.message))
      )
  }

  saveProduct() {
    
  }

  updateProduct() {

  }

  deleteProduct() {

  }
}
