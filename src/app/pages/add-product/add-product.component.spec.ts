import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        { provide: ToastrService, useValue: toastrService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
