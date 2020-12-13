import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  shoppingCartItemCount = 0;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart()
    cart$.subscribe((cart: any) => {
      this.shoppingCartItemCount = 0
      if (cart !== null) {
        for (let productId in cart.items) {
          this.shoppingCartItemCount += cart.items[productId].quantity
        }
      }
    })
  }

  logout() {
    this.auth.logout();
  }

}
