import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: Array<string> = [];

  productSubscription?: Subscription;
  constructor(private storeService: StoreService) {}
  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
  ngOnInit(): void {
   this.getAllCategories();
  }
  getAllCategories() {
    this.productSubscription = this.storeService
      .getAllCategories()
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
    //this.getProductsByCategory(category);
  }
  handleSelectCategory(category:string){
   console.log("La categorie selectionnee est : " + category)
  }
}
