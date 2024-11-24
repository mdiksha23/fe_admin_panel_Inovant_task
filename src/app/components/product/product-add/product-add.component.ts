import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from 'src/app/services/http-request.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm :any= this.fb.group({
    sku: ['', Validators.required],
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    images: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private http: HttpRequestService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('sku', this.productForm?.getRawValue()?.sku);
      formData.append('name', this.productForm?.getRawValue()?.name);
      formData.append('price', this.productForm?.getRawValue()?.price);
      const files :any = this.productForm?.getRawValue()?.images;
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      this.http.request('post','product/addProduct',formData,'blob').subscribe((res:any)=>{
        console.log("res-->",res);
        
      })
    }
  }
}
