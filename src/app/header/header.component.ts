import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  productNumberInCart:string;

  constructor(private store:Store) { 
  }

  ngOnInit(): void {
    this.store.select(state => state.cart.products).subscribe(i => this.productNumberInCart = i.length);
  }
}