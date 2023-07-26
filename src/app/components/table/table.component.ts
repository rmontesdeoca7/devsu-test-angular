import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/interfaces/products-response.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private apiService  = inject( ApiService );
  private toastr      = inject( ToastrService );
  
  public products:Product[] = [];
  public productsAll:Product[] = [];
  public open:boolean = false;

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

  openDelete(id: string) {
    const resp = confirm('Estas seguro de borrar?');
    if( resp ) {
      this.apiService.deleteProduct(id)
        .subscribe({
          error:  (err) => {
            if(err == 200){
              this.toastr.success('Se ha eliminado correctamente', 'Éxito')
              this.getProducts();
            } 
            else this.toastr.error('Ocurrio un error al eliminar', 'Error')
          }
        })
    }
    
  }

}
