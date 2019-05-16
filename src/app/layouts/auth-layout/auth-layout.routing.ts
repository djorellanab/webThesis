import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { NotFoundComponent } from '../../pages/not-found/not-found.component';
import { ForbiddenComponent } from '../../pages/forbidden/forbidden.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'forbidden',          component: ForbiddenComponent },
    { path: 'notfound',          component: NotFoundComponent }
];
