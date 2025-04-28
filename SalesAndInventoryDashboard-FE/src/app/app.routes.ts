import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListProductsComponent } from './components/dashboard/list-products/list-products.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },

    {
        path: 'all-products',
        component: ListProductsComponent,
    }
];
