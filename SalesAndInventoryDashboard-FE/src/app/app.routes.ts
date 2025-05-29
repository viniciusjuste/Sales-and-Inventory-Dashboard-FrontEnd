import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListSalesComponent } from './components/list-sales/list-sales.component';
import { AddSaleComponent } from './components/add-sale/add-sale.component';

export const routes: Routes = [
    {
        path: '',
        component: ListProductsComponent,
    },

    {
        path: 'add-product',
        component: AddProductComponent,
    },

     {
        path: 'list-sales',
        component: ListSalesComponent,
    },

    {
        path: 'add-sales',
        component: AddSaleComponent,
    }
];
