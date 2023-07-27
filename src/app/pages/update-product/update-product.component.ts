import { HttpParams } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Product } from '../../interfaces/products-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent  implements OnInit{
  private route             = inject( ActivatedRoute );
  private apiService        = inject( ApiService );
  private fb                = inject( FormBuilder );
  private toastr            = inject( ToastrService );
  private validatorsService  = inject( ValidatorsService )

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
          date_release: formatDate(this.product.date_release, 'yyyy-MM-dd', 'en'),
          date_revision: formatDate(this.product.date_revision, 'yyyy-MM-dd', 'en')
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
    this.updateForm.reset({
      id: this.product.id,
      name: '',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    });
    
  }

  isValidField ( field: string ) {
    return this.validatorsService.isValidField(this.updateForm, field);
  }

  getFieldError ( field: string): string | null {
    return this.validatorsService.getFieldError(this.updateForm, field);
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

  updateProductSer(){
    if( this.updateForm.invalid ) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const body:Product = this.updateForm.value;
    
    this.apiService.updateProduct(body)
      .subscribe({
        next:  () => this.toastr.success('Guardado con éxito', 'Éxito'),
        error: () => this.toastr.error('Ocurrio un error al guardar', 'Error')
      })
  }

}
