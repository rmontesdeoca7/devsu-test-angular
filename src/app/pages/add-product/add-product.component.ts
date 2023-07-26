import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { formatDate } from '@angular/common';
import { Product } from 'src/app/interfaces/products-response.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  private fb          = inject( FormBuilder );
  private apiService  = inject( ApiService );
  private toastr      = inject( ToastrService );

  public today:Date = new Date();
  public config = {
    format: "YYYY-MM-DD",
    min:  formatDate(this.today, 'yyyy-MM-dd', 'en'),
  };

  public registerForm: FormGroup = this.fb.group({
    id: ['', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(10)]
    ],
    name: ['', [
      Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(100)]
    ],
    description: ['', [
      Validators.required,
      Validators.minLength(10), 
      Validators.maxLength(200)]
    ],
    logo: ['https://www.pichincha.com/portal/Portals/0/adam/Submenu/3g1_aCLaLkmMOQiAb78wsg/Icon/debito.jpg?w=300&h=200&mode=crop', [Validators.required]],
    date_release:   [formatDate(this.today, 'yyyy-MM-dd', 'en'), [Validators.required]],
    date_revision:  [formatDate(this.today, 'yyyy-MM-dd', 'en')],
  });

  register(){
    if( this.registerForm.invalid ) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const body:Product = this.registerForm.value;
    
    this.apiService.saveProduct(body)
      .subscribe({
        next: () =>{ 
          this.toastr.success('Guardado con éxito', 'Éxito');
          this.resetForm();
        },
        error: () => this.toastr.error('Ocurrio un error al guardar', 'Error')
      })
  }

  resetForm() {
    this.registerForm.reset();
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
  }

  isValidField ( field: string ) {
    return this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
  }

  getFieldError ( field: string): string | null {
    if ( !this.registerForm.controls[field] ) return null;
    const errors = this.registerForm.controls[field].errors || {};

    for(const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength} caracteres`
        case 'maxlength':
          return `Máximo ${ errors['maxlength'].requiredLength} caracteres`
      }
    }

    return null
  }

  onChangeDate() {
    const date = this.registerForm.controls['date_release'].value;
    const oneYear = new Date(date);
    oneYear.setFullYear(oneYear.getFullYear() + 1);
    this.registerForm.controls['date_revision'].setValue(this.stringFormat(oneYear));
  }

  stringFormat(date: Date) {
    let day:string | number = date.getDate() + 1; 
    day = day.toString().padStart(2, '0'); 
    let month:string | number = date.getMonth() + 1; 
    month = month.toString().padStart(2, '0'); 
    const year = date.getFullYear(); 
    const newDate = year  + '-' + month + '-' + day;
    
    return newDate
  }
}
