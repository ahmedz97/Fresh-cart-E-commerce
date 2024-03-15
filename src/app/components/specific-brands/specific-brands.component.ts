import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemData } from 'src/app/interfaces/CategoryAndBrands';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-specific-brands',
  templateUrl: './specific-brands.component.html',
  styleUrls: ['./specific-brands.component.css']
})
export class SpecificBrandsComponent implements OnInit {
  brandId: string = ''
  isLoading: boolean = false
  brandDetails: itemData = {
    _id: '',
    name: '',
    slug: '',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  constructor(private _ProductService: ProductService, private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getBrandId();
    this.getBrandDetails();
  }

  getBrandId() {
    this._ActivatedRoute.params.subscribe( prams => this.brandId = prams['id'])
  }

  getBrandDetails() {
    this._ProductService.getSpecificBrand(this.brandId).subscribe({
      next: (response) => {
        this.isLoading = false
        this.brandDetails = response.data
      },
      error: (err) => {
        this.isLoading = false
        console.log(err);
      }
    })
  }
}
