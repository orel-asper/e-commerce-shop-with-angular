import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit, OnDestroy {
  cartProduct: any
  cartProductId: any
  shoppingCartItemCount = 0
  Tprise: number
  subscriptions: Subscription

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.subscriptions = (await this.shoppingCartService.getCartI()).subscribe(((cart: any) => {
      if (cart.length) {
        this.cartProduct = cart
        this.cartProductId = Object.keys(this.cartProduct[0])

        this.Tprise = 0

        for (let productId in cart[0]) {
          this.shoppingCartItemCount += cart[0][productId].quantity
          this.Tprise += Number(this.cartProduct[0][productId].product.price) * this.cartProduct[0][productId].quantity
        }
      }
    }))
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  clearCart() {
    this.cartProduct = null
    this.cartProductId = null
    this.Tprise = null
    this.shoppingCartItemCount = 0
    this.shoppingCartService.clearCart()
  }
}
