import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';

export const routes: Routes = [
    {
        path: '',
        component: ListProductsComponent,
    },

    {
        path: 'add-product',
        component: AddProductComponent,
    }
];
