import { Routes } from '@angular/router';
import { Page } from './page/page';
import { Login } from './account/login/login';
import { Settings } from './account/settings/settings';
import { authGuard } from './guards/route.guard';

export const routes: Routes = [
  {
    path: '',
    component: Page,
    data: { mode: 'discover' },
  },
  {
    path: 'my-images',
    component: Page,
    data: { mode: 'my-images' },
    canActivate: [authGuard],
  },
  {
    path: 'account/login',
    component: Login,
  },
  {
    path: 'account/settings',
    component: Settings,
    canActivate: [authGuard],
  },
];
