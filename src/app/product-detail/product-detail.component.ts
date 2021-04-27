import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/store/models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  name : string = "";
  product:Product;
  constructor(private route:ActivatedRoute, private productsService:ProductsService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('id');
    this.productsService.getProduct(this.name).subscribe(x => {
      this.product = x;
    });
  }
}