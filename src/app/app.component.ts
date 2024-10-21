import { Component } from '@angular/core';
import { Item } from './models/item';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-green-grocers';
  items: Item[] = []
  shoppingCart: Item[] = [];
  selectedType: string = "";

  constructor(private readonly appService: AppService) {}
  ngOnInit(): void {
    this.appService.getItems().subscribe(items => this.items = items);
    this.loadItems();
  }
  loadItems(): void {
    if (this.selectedType === '') {
      this.appService.getItems().subscribe((items) => {
        this.items = items;
      });
    } else {
      this.appService.getTypedItems(this.selectedType).subscribe((items) => {
        this.items = items;
      });
    }
  }

  onTypeChange(): void {
    this.loadItems();
  }
  addToCart(item: Item): void {
    this.appService.addToShoppingCart(item);
    this.shoppingCart = this.appService.getShoppingCart();
  }
  getTotal(): number {
    return this.shoppingCart.reduce((total, item) => total + item.price, 0);
  }
}
