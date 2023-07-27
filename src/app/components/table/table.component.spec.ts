import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TableComponent } from './table.component';
import { ApiService } from '../../services/api.service';
import { ToastRef, ToastrModule, ToastrService } from 'ngx-toastr';
import { Product } from '../../interfaces/products-response.interface';
import { Subject, of } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';

const mockProduct: Product[] = [{
  id: 'tj-q1',
  name: 'Tarjetas',
  description: 'Tarjetas de crédito',
  logo: 'img.jpg',
  date_release: '2023-07-26',
  date_revision: '2024-07-26'
}];

const toastPackageMock = {
  toastId: '',
  toastType: '',
  message: '',
  title: '',
  toastRef: ToastRef<unknown>,
};

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let toastr: ToastrService;
  let compiled: HTMLElement;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        ApiService,
        { provide: ToastrService, useValue: toastPackageMock  }
      ]
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    service = TestBed.inject( ApiService );
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be match with the snapshop', () => {
    expect(compiled.innerHTML).toMatchSnapshot();
  });

  it('should call getProducts()', () => {
    const spy = jest.spyOn(service, 'getProducts').mockReturnValue(of(mockProduct));
    jest.spyOn(component, 'filterTermHandler');
    component.getProducts();
    expect(spy).toHaveBeenCalled();
    expect(component.productsAll.length).toBeGreaterThan(0);
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should filterTermHandler()', () => {
    const term = 'Tarjetas';
    component.productsAll = mockProduct;
    component.filterTermHandler(term);
    expect(component.products.length).toBeGreaterThanOrEqual(0);
  });

  it('should call getSearchTerm()', () => {
    const term = 'txt'
    const filter = jest.spyOn(component,'filterTermHandler')
    jest.spyOn(service.dispachSearchTerm, 'subscribe');
    component.productsAll = mockProduct;
    component.getSearchTerm()
    expect(component.products.length).toBeGreaterThanOrEqual(0);
    expect(component.products).toBeTruthy();
  });

  it('should call openDelete()', () => {
    jest.spyOn(window, "confirm").mockReturnValue(true);
    const spy = jest.spyOn(component, 'deleteService');
    const id = 'tj-q1'
    component.openDelete(id);
    expect(window.confirm).toHaveBeenCalled();

    jest.spyOn(window, "confirm").mockReturnValue(false);
    component.openDelete(id);
    expect(component.openDelete(id)).toBe(undefined)

  });

  it('should call deleteService()', () => {
    const id = 'tj-q1'
    const spy = jest.spyOn(service, 'deleteProduct')
    component.deleteService(id);
    expect(spy).toHaveBeenCalled();
  });

  it('should call deleteService() error', async () => {
    const id = 'tj-q1';
    const mockResponse = '200';
    jest.spyOn(service, 'deleteProduct').mockReturnValue(of(new Error(mockResponse)))
    const result = await component.deleteService(id);
    console.log(result)
    expect(result).toBeUndefined();
  });



  it('should call onChangeSelect()', () => {
    const value = "5";
    component.productsAll = [{
      id: 'tj-q1',
      name: 'Tarjetas',
      description: 'Tarjetas de crédito',
      logo: 'img.jpg',
      date_release: '2023-07-26',
      date_revision: '2024-07-26'
    }]
    component.onChangeSelect(value);
    expect(component.products.length).toBeLessThanOrEqual(+value);
  });
});
