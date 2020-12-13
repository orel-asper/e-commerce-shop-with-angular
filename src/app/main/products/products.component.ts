import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products = []
  filterProducts: any
  categories$: any
  category: string
  cart: any
  subscriptions: Subscription

  constructor(productService: ProductService, categoryService: CategoryService, route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
    productService.getProductList().subscribe((products => {
      this.products = products
      this.filterProducts = products
      route.queryParamMap.subscribe(params => { this.category = params.get('category') })
    }))
    this.categories$ = categoryService.getCategories()

  }
  async ngOnInit() {
    this.subscriptions = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart)
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  fProduct() {
    this.filterProducts = (this.category) ?
      this.products.filter((p: { category: string; }) => p.category === this.category) : this.filterProducts = this.products
  }
}
