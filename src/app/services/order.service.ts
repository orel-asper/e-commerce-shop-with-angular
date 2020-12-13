import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

async placeOrder(order: any) {
  let result = await this.db.list('/orders').push(order)
  this.shoppingCartService.clearCart()
  return result
  }
}
