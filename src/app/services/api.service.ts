import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  getProducts () {
    const url = `${this.baseUrl}/bp/products`;
    const headers = new HttpHeaders()
      .set( 'authorId', '1' );

    return this.http.get<any>(url, { headers })
      .pipe(
        catchError(err => throwError(() => err.error.message))
      )
  }
}
