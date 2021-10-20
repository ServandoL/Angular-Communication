import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './edit/product-edit.component';

import { ProductService } from './product.service';
import { ProductEditGuard } from './edit/product-edit-guard.service';
import { ProductParameterService } from './product-parameter.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailComponent },
      {
        path: ':id/edit',
        canDeactivate: [ ProductEditGuard ],
        component: ProductEditComponent
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent
  ],
  providers: [
    ProductService,
    ProductEditGuard,
    ProductParameterService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ProductModule { }
