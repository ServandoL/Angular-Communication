import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { NullAstVisitor } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';

    sub: Subscription;

    product: IProduct | null;

    constructor(private productService: ProductService) { }

    ngOnInit() {
      this.sub = this.productService.selectedProductChanges$.subscribe(
        selectedProduct => this.product = selectedProduct
      );
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

}
