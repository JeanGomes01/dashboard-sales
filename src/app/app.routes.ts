import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { LayoutComponent } from './modules/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
    ],
  },
];
