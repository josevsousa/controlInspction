import { Routes } from '@angular/router';
import { AuthGuard } from './guardRouter/auth.guard';
import { NoAuthGuard } from './guardRouter/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'inspection-list',
    loadComponent: () => import('./pages/inspection-list/inspection-list.page').then( m => m.InspectionListPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'environment-list/:inspection',
    loadComponent: () => import('./pages/environment-list/environment-list.page').then( m => m.EnvironmentListPage),
    // canActivate: [AuthGuard]
  },
  {
    path: 'images-list',
    loadComponent: () => import('./pages/images-list/images-list.page').then( m => m.ImagesListPage),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
