import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  key$: any

  constructor(private productService: ProductService) {
    this.key$ = this.productService.getAll()
  }


  ngOnInit(): void {
  }
}
