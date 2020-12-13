import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('products').push(product)
  }

  getAll() {
    return this.db.list('products').snapshotChanges()
  }

  getProductList() {
    return this.db.list('products').valueChanges()
  }

  getOne(id: string) {
    return this.db.list(`products/${id}`).valueChanges()
  }

  update(id: string, product: any) {
    return this.db.object(`products/${id}`).update(product)
  }

  delete(id: string) {
    return this.db.object(`products/${id}`).remove()
  }
}
