import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
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

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let toastrService: ToastrService;
  let validatorsService: ValidatorsService;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        { provide: ToastrService, useValue: toastrService },
        ValidatorsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    validatorsService = TestBed.inject(ValidatorsService);
    service = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register()', () => {
    component.registerForm.reset({
      id: 'tjr-demo',
      name: 'Tarjeta',
      description: 'Tarjeta',
      logo: 'img.png',
      date_release: '2023-02-12',
      date_revision: '2024-02-12'
    });

    const spy = jest.spyOn(service, 'saveProduct').mockReturnValue(of(mockProduct));
    component.register();
    expect(spy).toHaveBeenCalled();
  });

  it('should call register() with form invalid', () => {
    component.registerForm.reset({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: '2023-02-12',
      date_revision: '2024-02-12'
    });
    component.register();
    expect(component.register()).toBe(undefined);
  
  });

  it('should getFieldError()', () => {
    const spy = jest.spyOn(validatorsService, 'getFieldError');
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
