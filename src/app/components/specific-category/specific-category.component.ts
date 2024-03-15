import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { itemData } from 'src/app/interfaces/CategoryAndBrands';

@Component({
  selector: 'app-specific-category',
  templateUrl: './specific-category.component.html',
  styleUrls: ['./specific-category.component.css']
})
export class SpecificCategoryComponent implements OnInit {
  categoryId: string = '';
  isLoading: boolean = false
  categoryDetails: itemData = {
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
    this.getCategoryId();
    this.getCategoryDetails();
  }

  getCategoryId() {
    this._ActivatedRoute.params.subscribe((params) => {
      this.categoryId = params['id']
    })
  }

  getCategoryDetails() {
    this._ProductService.getSpecificCategory(this.categoryId).subscribe({
      next: (response) => {
        this.isLoading = false
        this.categoryDetails = response.data
      },
      error: (err) => {
        this.isLoading = false
        console.log(err);
      }
    })
  }
}
