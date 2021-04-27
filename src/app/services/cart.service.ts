import { Injectable } from '@angular/core';
import { Store, Selector } from '@ngxs/store';
import { CartAction } from 'src/store/actions/cart.action';
import { Product } from 'src/store/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private store:Store) { }

  add (product:Product) {
    this.store.dispatch(new CartAction.Add(product));
  }

  delete (product:Product) {
    this.store.dispatch(new CartAction.Delete(product));
  }

  emptyCart () {
    this.store.dispatch(new CartAction.EmptyCart());
  }
}
