import { Injectable, inject } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { ApiService } from './api.service';


@Injectable({ providedIn: 'root'})
export class IdValidator implements AsyncValidator {
  private apiService = inject( ApiService );

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const id = control.value;
    
    return this.apiService.getCheckId(id)
      .pipe(
        map(resp => {
          return (
            resp 
            ? { idTaken: true} 
            : null
          )
        })
      )
  }
}