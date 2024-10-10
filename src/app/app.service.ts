import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiURL = environment.apiUrl + "groceries"

  private itemList: Item[] = [];
  private shoppingCart: Item[] = [];

  constructor(private http: HttpClient) {
    console.log(this.apiURL)
    this.getItems().subscribe(item => this.itemList = item)
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiURL)
  }

  getTypedItems(type: string): Observable<Item[]> {
    const url = `${this.apiURL}?type=${type}`;
    return this.http.get<Item[]>(url);
}

  addToShoppingCart(item: Item): void {
    this.shoppingCart.push(item);
  }

  getShoppingCart(): Item[] {
    return this.shoppingCart;
  }

}