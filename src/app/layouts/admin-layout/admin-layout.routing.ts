import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { FunctionalMovementCreateComponent } from '../../pages/functional-movement/create/create.component';
import { FunctionalMovementIndexComponent } from '../../pages/functional-movement/index/index.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                    component: DashboardComponent },
    { path: 'functionalmovement',    component: FunctionalMovementCreateComponent },
    { path: 'functionalmovement/create',    component: FunctionalMovementIndexComponent },
   // { path: 'functionalmovement/:id',    component: FunctionalMovementCreateComponent },
    //{ path: 'functionalmovement/train/:id',    component: FunctionalMovementCreateComponent }
];
