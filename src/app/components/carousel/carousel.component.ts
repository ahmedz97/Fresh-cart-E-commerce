import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { itemData } from 'src/app/interfaces/CategoryAndBrands';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  categoriesData: itemData[] = [];
  carouselOptions: OwlOptions = {
    loop: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 600,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 400,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  constructor(private _ProductService: ProductService) { }

  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next: response => this.categoriesData = response.data,
      error: err => console.log(err)
    })
  }

}
