import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TableComponent } from './table.component';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../interfaces/products-response.interface';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

const mockProduct: Product[] = [{
  id: 'tj-q1',
  name: 'Tarjetas',
  description: 'Tarjetas de crédito',
  logo: 'img.jpg',
  date_release: '2023-07-26',
  date_revision: '2024-07-26'
}];

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let toastrService: ToastrService;
  let compiled: HTMLElement;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        { provide: ToastrService, useValue: toastrService }
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
    component.getProducts();
    expect(spy).toHaveBeenCalled();
    expect(component.productsAll.length).toBeGreaterThan(0);
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should call getSearchTerm()', () => {
    const term = 'txt'
    const emitter = new EventEmitter();

    jest.spyOn(service.dispachSearchTerm, 'subscribe');
    component.productsAll = mockProduct;
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
