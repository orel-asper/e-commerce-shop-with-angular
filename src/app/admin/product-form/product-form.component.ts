import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: any
  product = [];
  id: string
  public myForm: FormGroup

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories()
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) this.productService.getOne(this.id).pipe(take(1)).subscribe(p => this.product = p)
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*\.?[0-9]*$")]),
      category: new FormControl('', Validators.required),
      image: new FormControl('', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]),
      id: new FormControl(uuidv4())
    })
  }


  onSave(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    
    this.router.navigate(['/admin/dashboard'])
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product')) return;

    this.productService.delete(this.id)
    this.router.navigate(['/admin/dashboard'])
  }
}
