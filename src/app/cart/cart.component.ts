import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from 'src/store/models/product';
import { CartService } from '../services/cart.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productNumber:string;
  price = 0;
  cartContent: Observable<Product[]>;
  isEmpty:Boolean = true;

  constructor(private store:Store, private cartService:CartService, private router:Router) { }

  ngOnInit(): void {
    this.cartContent = this.store.select(state => state.cart.products);
    this.store.select(state => state.cart.products).subscribe(i => {
      
      this.price = 0;
      
      this.productNumber = i.length;
      if (i.length == 0)
        this.price = 0;

      for(var a = 0; a < i.length; a++) {
        this.price += i[a].price;
      }
    });
    this.cartContent.subscribe(x => { 
      if (x.length > 0) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
    })
  }

  deleteFromCart(product:Product) {
    this.cartService.delete(product);
  }

  payment(){
    this.cartService.emptyCart();
    this.router.navigate(['paymentSuccess']);
  }
}