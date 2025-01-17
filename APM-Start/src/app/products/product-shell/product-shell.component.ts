import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "../product.service";

@Component({
  templateUrl: "./product-shell.component.html",
})
export class ProductShellComponent implements OnInit, OnDestroy {
  pageTitle: string = "Products";
  monthCount: number;
  sub: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => {
        if (selectedProduct) {
          const start = new Date(selectedProduct.releaseDate);
          const now = new Date();
          this.monthCount =
            now.getMonth() -
            start.getMonth() +
            12 * (now.getFullYear() - start.getFullYear());
        } else {
          this.monthCount = 0;
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
