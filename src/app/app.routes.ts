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
    path: 'inspecao',
    loadComponent: () => import('./pages/inspecao/inspecao.page').then( m => m.InspecaoPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'ambiente',
    loadComponent: () => import('./pages/ambiente/ambiente.page').then( m => m.AmbientePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'problema',
    loadComponent: () => import('./pages/problema/problema.page').then( m => m.ProblemaPage),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }



];
