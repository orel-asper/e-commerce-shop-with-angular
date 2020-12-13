import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/internal/operators/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) { }
  data: any

  async clearCart() {
    let cartId = await this.getOrCreateCartid()
    this.db.object(`shopping-cart/${cartId}/items`).remove()
  }

  private create() {
    return this.db.list('shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart() {
    let cartId = await this.getOrCreateCartid()
    return this.db.object(`shopping-cart/${cartId}`).valueChanges()
  }

  async getCartI() {
    let cartId = await this.getOrCreateCartid()
    return this.db.list(`shopping-cart/${cartId}`).valueChanges()
  }

  private async getOrCreateCartid() {
    let cartId = localStorage.getItem('cartId')
    if (cartId) return cartId

    let result = await this.create()
    localStorage.setItem('cartId', result.key)
    return result.key
  }

  private getItem(cartId: string, product: any) {
    return this.db.object(`shopping-cart/${cartId}/items/${product.id}`)
  }

  async addToCart(product: any) {
    this.updateItemQuantity(product, 1)
  }

  async removeFromCart(product: any) {
    this.updateItemQuantity(product, -1)
  }

  private async updateItemQuantity(product: any, change: number) {
    let cartId = await this.getOrCreateCartid()
    let item$ = this.getItem(cartId, product)
    item$.snapshotChanges().pipe(take(1)).subscribe(async item => {
      this.data = item.payload.val()

      if (this.data != null) {
        item$.update({ product: product, quantity: (this.data.quantity) + change });
      } else {
        item$.set({ product: product, quantity: 1 });
      }
    })
  }
}

