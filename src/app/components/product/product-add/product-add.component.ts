import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

   isRetrieve =false
   id=''
  constructor(private fb: FormBuilder, private http: HttpRequestService ,private router :Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe((params : any) => {
    console.log(params); 
    if(params){
       this.isRetrieve =true
       this.id=params.id
      this. productForm.patchValue({
        sku : params.sku,
        name:params.name,
        price:params.price,
  
      })
    }
  });
  
    
  }

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
      if(this.isRetrieve){
        this.http.request('post','product/updateProduct/'+this.id, formData ,'json').subscribe((res:any)=>{
          console.log("res-->post", res);
            
          if(res.status){
            this.router.navigate(['/product-list']);
          }
          else{
            console.error('Error adding product:', res.message);
            alert(res.message)
           
          }
         
        })
      }
      else{
        this.http.request('post','product/addProduct', formData ,'json').subscribe((res:any)=>{
          console.log("res-->post", res);
            
          if(res.status){
            this.router.navigate(['/product-list']);
          }
          else{
            console.error('Error adding product:', res.message);
            alert(res.message)
           
          }
         
        })

      }
    
    }
  }

 
}

