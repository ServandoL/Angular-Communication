import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgModel } from "@angular/forms";
import { CriteriaComponent } from "../shared/criteria/criteria.component";

import { IProduct } from "./product";
import { ProductParameterService } from "./product-parameter.service";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = "Product List";
  includeDetail: boolean = true;
  parentListFilter: string;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[];

  @ViewChild("filterElement") filterElementRef: ElementRef;
  @ViewChild(NgModel) filterInput: NgModel;

  // private _sub: Subscription;
  // private _filterInput: NgModel;

  // get filterInput(): NgModel {
  //   return this._filterInput;
  // }

  // @ViewChild(NgModel)
  // set filterInput(value: NgModel) {
  //   this._filterInput = value;
  //   if (this._filterInput && !this._sub) {
  //     this._sub = this.filterInput.valueChanges.subscribe(() =>
  //       this.performFilter(this.listFilter)
  //     );
  //   }
  //   if (this.filterElementRef) {
  //     this.filterElementRef.nativeElement.focus();
  //   }
  // }

  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

  get showImage(): boolean {
    return this.productParameterService.showImage
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  constructor(private productService: ProductService, private productParameterService: ProductParameterService) {}

  // ngAfterViewInit(): void {
  //   this.filterInput.valueChanges.subscribe(
  //     () => this.performFilter(this.listFilter)
  //   );
  //   this.filterElementRef.nativeElement.focus();
  // }

  onValueChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
  }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  // onFilterChange(filter: string): void {
  //   this.listFilter = filter;
  //   this.performFilter(this.listFilter);
  // }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
