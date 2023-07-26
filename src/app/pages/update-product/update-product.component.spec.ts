import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductComponent } from './update-product.component';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProductComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        ApiService,
        { provide: ToastrService, useValue: toastrService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
