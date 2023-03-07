import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
  cols = 3;
  rowHeight = this.ROWS_HEIGHT[this.cols];
  categoryName?: string;
  products?: Array<Product>;
  sort = 'desc';
  count = 12;
 
  productSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}
  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  getProducts() {
    this.productSubscription = this.storeService
      .getAllProducts(this.count, this.sort,this.categoryName)
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error:(err) =>{
          console.log(err);
        },
      });
  }
  onColumnsCountChange(colsNumber: number) {
    this.cols = colsNumber;
    this.rowHeight = this.ROWS_HEIGHT[this.cols];
  }
  onShowCategory(category: string) {
    this.categoryName = category;
    this.getProducts();
  }
  handleAddCart(product: Product) {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
  ngOnInit(): void {
    this.getProducts();
  }
  handleItemsCountChange(newCount: number) {
    this.count = newCount;
    this.getProducts();
  }
  handleSortChange(newSort: string) {
    this.sort = newSort;
    this.getProducts();
  }
}
