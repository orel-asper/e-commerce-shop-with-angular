import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: any
  @Input('shopping-cart') shoppingCart: any

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product)
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product)
  }

  getQuantity() {
    if (!this.shoppingCart) return 0
    let item = this.shoppingCart.items[this.product.id]
    return item ? item.quantity : 0
  }

}
