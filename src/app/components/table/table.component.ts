import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/interfaces/products-response.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private apiService = inject( ApiService );

  public products:Product[] = [];

  ngOnInit(){
    this.getProducts();
  }

  getProducts() {
    this.apiService.getProducts()
    .subscribe({
      next: (products) => this.products = products,
      error: (message) => {
        console.log({ message })
      }

    })
  }

}
