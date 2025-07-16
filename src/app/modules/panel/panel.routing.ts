import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsAuthSiteGuard } from 'src/app/core/services/cmsAuthSiteGuard.service';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageMenuComponent } from './page-menu/page-menu.component';
import { PanelComponent } from './panel.component';

const PanelRouting: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
   
      // ** cms */
      {
        path: 'dashboard',
        canActivate: [CmsAuthSiteGuard],
        component: PageDashboardComponent,
      },
      {
        path: 'menu',
        canActivate: [CmsAuthSiteGuard],
        component: PageMenuComponent,
      },
      {
        path: 'menu/LinkParentId/:LinkParentId',
        canActivate: [CmsAuthSiteGuard],
        component: PageMenuComponent,
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ]
  },
];

export { PanelRouting };