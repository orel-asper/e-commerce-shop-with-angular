import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  public myForm: FormGroup
  userId: string
  cart: any
  cartsubscription: Subscription
  userSubscription: Subscription

  constructor(private shoppingCartService: ShoppingCartService, private orderService: OrderService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    })
    let cart$ = await this.shoppingCartService.getCart()
    this.cartsubscription = cart$.subscribe(cart => this.cart = cart)
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }
  ngOnDestroy(): void {
    this.cartsubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

  async placeOrder() {
    let order = {
      dataPlaced: new Date().getTime(),
      shipping: this.myForm.value,
      items: this.cart.items,
      userId: this.userId
    }
    let result = await this.orderService.placeOrder(order)
    this.router.navigate(['/order-success', result.key])
  }



}
