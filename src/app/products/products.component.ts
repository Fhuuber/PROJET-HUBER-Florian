import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartAction } from 'src/store/actions/cart.action';
import { Product } from 'src/store/models/product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products:Product[] = [];
  public productFilter:Product[] = [];
  public isEmpty:boolean = false;
  @Input() filter:String;

  constructor(private productsService:ProductsService, private cartService:CartService) { }

  ngOnInit(): void {
    this.productsService.getAll().subscribe(res=> {
      this.products = res;
      this.productFilter = res;
    });
  }

  addToCart(product:Product) {
    this.cartService.add(product);
  }

  search(filter:string) {
    this.filter = filter;
    this.isEmpty = false;
    this.productFilter = [];

    if (this.filter === "") {
      this.productFilter = this.products;
      return;
    } 

    for (let i = 0; i < this.products.length; i++)
    {
      if (this.products[i].name.toLowerCase().includes(this.filter.toLowerCase().trim())) {
        this.productFilter.push(this.products[i]);
      }
    }

    if (this.productFilter.length == 0)
    {
      this.isEmpty = true;
    }
  }
}