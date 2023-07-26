import { HttpParams } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Product } from '../../interfaces/products-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent  implements OnInit{
  private route       = inject( ActivatedRoute );
  private apiService  = inject( ApiService );
  private fb          = inject( FormBuilder );
  private toastr      = inject( ToastrService );

  public product:Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  };

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap( ({ id }) => this.apiService.getProductId(id))
      )
      .subscribe( (product) => {
        this.product = product[0]; 

        this.updateForm.reset({
          id: this.product.id,
          name: this.product.name,
          description: this.product.description,
          logo: this.product.logo,
          date_release: this.product.date_release,
          date_revision: this.product.date_revision
        })
      })
  }

  public today:Date = new Date();
  public config = {
    format: "YYYY-MM-DD",
    min:  formatDate(this.today, 'yyyy-MM-dd', 'en'),
  };

  public updateForm: FormGroup = this.fb.group({
    id: [this.product.id, [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(10)]
    ],
    name: [this.product.name, [
      Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(100)]
    ],
    description: [this.product.description, [
      Validators.required,
      Validators.minLength(10), 
      Validators.maxLength(200)]
    ],
    logo: [this.product.logo, [Validators.required]],
    date_release:  [this.product.date_release, [Validators.required]],
    date_revision: [this.product.date_revision],
  });

  resetForm() {
    this.updateForm.reset();
    this.updateForm.markAsPristine();
    this.updateForm.markAsUntouched();
  }

  isValidField ( field: string ) {
    return this.updateForm.controls[field].errors &&
      this.updateForm.controls[field].touched
  }

  getFieldError ( field: string): string | null {
    if ( !this.updateForm.controls[field] ) return null;
    const errors = this.updateForm.controls[field].errors || {};

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
    const date = this.updateForm.controls['date_release'].value;
    const oneYear = new Date(date);
    oneYear.setFullYear(oneYear.getFullYear() + 1);
    this.updateForm.controls['date_revision'].setValue(this.stringFormat(oneYear));
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

  updateProduct(){
    if( this.updateForm.invalid ) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const body:Product = this.updateForm.value;
    
    this.apiService.updateProduct(body)
      .subscribe({
        next: () =>{ 
          this.toastr.success('Guardado con éxito', 'Éxito');
          this.resetForm();
        },
        error: () => this.toastr.error('Ocurrio un error al guardar', 'Error')
      })
  }

}
