import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { formatDate } from '@angular/common';
import { Product } from '../../interfaces/products-response.interface';
import { ToastrService } from 'ngx-toastr';
import { ValidatorsService } from '../../services/validators.service';
import { IdValidator } from '../../services/idValidator.service';

@Component({
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  private fb                  = inject( FormBuilder );
  private apiService          = inject( ApiService );
  private toastr              = inject( ToastrService );
  private validatorsService   = inject( ValidatorsService)

  public today:Date = new Date();
  public config = {
    format: "YYYY-MM-DD",
    min:  formatDate(this.today, 'yyyy-MM-dd', 'en'),
  };

  public registerForm: FormGroup = this.fb.group({
    id: ['', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(10)],
      [new IdValidator()]
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
          this.registerForm.reset();
        },
        error: () => this.toastr.error('Ocurrio un error al guardar', 'Error')
      })
  }

  isValidField ( field: string ) {
    return this.validatorsService.isValidField(this.registerForm, field);
  }

  getFieldError ( field: string): string | null {
    return this.validatorsService.getFieldError(this.registerForm, field);
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
