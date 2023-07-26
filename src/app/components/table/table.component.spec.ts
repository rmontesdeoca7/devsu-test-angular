import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TableComponent } from './table.component';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../interfaces/products-response.interface';

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

  xit('should call getProducts()', () => {
    const spy = jest.spyOn(service, 'getProducts').mockImplementation();
    component.productsAll = [{
      id: 'tj-q1',
      name: 'Tarjetas',
      description: 'Tarjetas de crédito',
      logo: 'img.jpg',
      date_release: '2023-07-26',
      date_revision: '2024-07-26'
    }]
    component.getProducts();
    expect(spy).toBeCalled();
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
