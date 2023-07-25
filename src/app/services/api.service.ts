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

  constructor() {}


  getProducts (): Observable<Product[]> {
    const url = `${this.baseUrl}/bp/products`;
    return this.http.get<Product[]>(url, { headers: this.headers })
      .pipe(
        tap(),
        catchError(err => throwError(() => err.error.message))
      )
  }

  saveProduct( body:Product ) {
    const url = `${this.baseUrl}/bp/products`;    
    return this.http.post(url, body, { headers: this.headers })
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }

  updateProduct() {

  }

  deleteProduct() {

  }
}
