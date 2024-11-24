import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any = [];
  constructor(private http: HttpRequestService) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.http
      .request('get', 'product/getAllRecord', null, 'json')
      .subscribe((res: any) => {
        console.log('res', res);
        this.products = res.data;
      });
  }

  currentPage = 1; // Current page number

  get paginatedProducts() {
    return this.products;
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  //  edit funtionlity
  editProduct(id: any) {}
  deleteProduct(id: any) {
    this.http
      .request('delete', 'product/deleteProduct/' + id, null, 'json')
      .subscribe((res: any) => {
        console.log('res', res);
        this.getProductList();
      });
  }
}
