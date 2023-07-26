import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TableComponent } from './table.component';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let toastrService: ToastrService;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
