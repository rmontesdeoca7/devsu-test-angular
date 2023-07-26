import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdValidator } from './idValidator.service';
import { ApiService } from './api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

describe('ApiService', () => {
  let service: IdValidator;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        ApiService
      ]
    });
    service = TestBed.inject(IdValidator);
    apiService = TestBed.inject(ApiService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate()', () => {
    const id = 'txt';
    const form = new FormBuilder().group({
      name:['', Validators.minLength(3)]
    })
    service.validate(form)
    const spy = jest.spyOn(apiService, 'getCheckId')

    expect(spy).toBeCalledTimes(0);
  });

});