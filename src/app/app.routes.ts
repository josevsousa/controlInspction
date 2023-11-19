import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'inspection-list',
    loadComponent: () => import('./pages/inspection-list/inspection-list.page').then( m => m.InspectionListPage)
  },
  {
    path: 'environment-list',
    loadComponent: () => import('./pages/environment-list/environment-list.page').then( m => m.EnvironmentListPage)
  },
  {
    path: 'images-list',
    loadComponent: () => import('./pages/images-list/images-list.page').then( m => m.ImagesListPage)
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  }
];
