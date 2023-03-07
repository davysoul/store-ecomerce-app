import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 5000 });
  }
  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }
  clearCart() {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', { duration: 3000 });
  }
  removeFromCart(item:CartItem,update = true):Array<CartItem>{
   const filteredItems = this.cart.value.items.filter((_item)=>_item.id !== item.id);
    if(update){
      this.cart.next({items:filteredItems});
      this._snackBar.open('Cart was removed. ','Ok',{duration:3000})
    }
    return filteredItems;
  }
  decreaseItemFromCart(item:CartItem){
    let itemRemoved!:CartItem ;
    let filteredItems = this.cart.value.items.map((_item)=>{
      if(_item.id === item.id){
        _item.quantity --;
        if(_item.quantity === 0){
          itemRemoved = _item;
        }
      }
       return _item;
    } )
     if(itemRemoved){
      filteredItems = this.removeFromCart(itemRemoved,false)
     }
    // const items = [...this.cart.value.items];
    // const itemInCart = items.find((_item) => _item.id === item.id);
    // if(itemInCart)
    // itemInCart.quantity -=1;
     this.cart.next({ items:filteredItems }); 
    this._snackBar.open('One item was removed from the cart.', 'Ok', { duration: 3000 });                   
  }
}
