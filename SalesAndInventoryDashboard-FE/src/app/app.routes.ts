import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListProductsComponent } from './components/dashboard/list-products/list-products.component';
import { AddProductComponent } from './components/dashboard/add-product/add-product.component';

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
