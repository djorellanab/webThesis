import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { FunctionalMovementCreateComponent } from '../../pages/functional-movement/create/create.component';
import { FunctionalMovementIndexComponent } from '../../pages/functional-movement/index/index.component';
import { FunctionalMovementUpdateComponent } from '../../pages/functional-movement/update/update.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                    component: DashboardComponent },
    { path: 'functionalmovement',    component: FunctionalMovementIndexComponent },
    { path: 'functionalmovement/create',    component: FunctionalMovementCreateComponent },
    { path: 'functionalmovement/:id',    component: FunctionalMovementUpdateComponent },
    //{ path: 'functionalmovement/train/:id',    component: FunctionalMovementCreateComponent }
];
