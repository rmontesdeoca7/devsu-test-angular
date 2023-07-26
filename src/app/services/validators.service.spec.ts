import { TestBed } from '@angular/core/testing';
import { ValidatorsService } from './validators.service';
import { FormBuilder, Validators } from '@angular/forms';

describe('ApiService', () => {
  let service: ValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
    });
    service = TestBed.inject(ValidatorsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getFieldError()', () => {
    const form = new FormBuilder().group({
      name:['', Validators.minLength(3)]
    });
    service.getFieldError(form, "name");
    expect(service.getFieldError(form, "name")).toBe(null);
    expect(service.getFieldError(form, "")).toBe(null);
  });

  it('should getFieldError() with more errors', () => {
    const formV = new FormBuilder().group({
      name:['',[ Validators.required, Validators.minLength(3)]]
    });
    service.getFieldError(formV, "name");
    expect(service.getFieldError(formV, "name")).toBe('Este campo es requerido');
  });

});