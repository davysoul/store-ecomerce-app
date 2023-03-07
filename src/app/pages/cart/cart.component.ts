import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 2,
        id: 2,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  constructor(private cartService: CartService, private http: HttpClient) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
    this.dataSource = this.cart.items;
  }

  getTotalItem(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  handleClearCart() {
    this.cartService.clearCart();
  }
  handleRemoveItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }
  handleDecreaseQuantity(item: CartItem) {
    this.cartService.decreaseItemFromCart(item);
  }
  handleIncreaseQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }
  handleCheckOut() {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51LlMoSExVjAJ0Cl5kKtDcwuDC0jsjXgGvzeIhsBVqQFfXqaKfndr4TAMheg6s6UiBICrQZluxeVYxp3KUse7TDei00A1rEAaud'
        );
        stripe?.redirectToCheckout({ sessionId: res.id });
      });
  }
}
