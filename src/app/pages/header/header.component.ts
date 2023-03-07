import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private cartService: CartService) {}
  @Input()
  get cart() {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  clearCart() {
    this.cartService.clearCart();
  }
}
