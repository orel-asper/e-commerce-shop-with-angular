import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';


@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

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


}
