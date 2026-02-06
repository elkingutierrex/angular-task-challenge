import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  }
  return router.parseUrl('/login');
};

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./presentation/features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'tasks',
    loadComponent: () => import('./presentation/features/tasks/task-list/task-list').then(m => m.TaskListComponent),
    // canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
