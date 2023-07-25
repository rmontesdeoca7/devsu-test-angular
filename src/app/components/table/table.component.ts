import { Component, Input, OnInit, inject } from '@angular/core';
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
  public productsAll:Product[] = [];

  ngOnInit(){
    this.getProducts();
    this.getSearchTerm();
  }

  get productsLength () {
    return this.products.length;
  }

  getSearchTerm() {
    this.apiService.dispachSearchTerm
    .subscribe( term => {
     this.products = this.productsAll
      .filter( 
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)  
      )
    })
  }

  getProducts() {
    this.apiService.getProducts()
    .subscribe({
      next: (products) => {
        this.productsAll = products;
        this.products = products;
      },
      error: (message) => console.error({ message })
    });
  }

}
