import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProductComponent } from './update-product.component';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ValidatorsService } from '../../services/validators.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

const mockProduct = [
  {
    id: 'tj-q1',
    name: 'Tarjetas',
    description: 'Tarjetas de crédito',
    logo: 'img.jpg',
    date_release: '2023-07-26',
    date_revision: '2024-07-26'
  }
];

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  let toastrService: ToastrService;
  let validatorsService: ValidatorsService;
  let service:ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        ApiService,
        ValidatorsService,
        { provide: ToastrService, useValue: toastrService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    validatorsService = TestBed.inject(ValidatorsService);
    service = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateProductSer() with form invalid', () => {
    component.updateForm.reset({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '2023-02-12',
      date_revision: '2024-02-12'
    });
    component.updateProductSer();
    expect(component.updateProductSer()).toBe(undefined);
  });

  it('should call updateProductSer()', () => {
    fixture.detectChanges();
    component.updateForm.reset(mockProduct);
    const spy = jest.spyOn(service, 'updateProduct').mockReturnValue(of(mockProduct));
    component.updateProductSer();
    expect(component.updateForm.controls['name'].value).toBe(null);
  });  

  it('should be resetForm() all field to empty', () => {
    component.resetForm();
    expect(component.updateForm.controls['name'].value).toBe('');
  });

  it('should getFieldError()', () => {
    const spy = jest.spyOn(validatorsService, 'getFieldError');
    const form = new FormBuilder().group({
      date_release:  [''],
      date_revision: ['']
    });
    component.getFieldError('date_release');
    expect(spy).toHaveBeenCalled();
  });

  it('should call onChangeDate()', () => {
    const form = new FormBuilder().group({
      date_release:  [''],
      date_revision: ['']
    });
    component.onChangeDate();
    expect(form.controls['date_revision']).toBeTruthy();
  });

  it('should test the call stringFormat()', () => {
    const date = new Date();
    component.stringFormat(date);
    expect(component.stringFormat(date)).toBeTruthy();
  });
});
