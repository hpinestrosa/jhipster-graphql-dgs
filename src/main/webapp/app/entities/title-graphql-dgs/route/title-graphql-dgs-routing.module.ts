import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TitleGraphqlDgsComponent } from '../list/title-graphql-dgs.component';
import { TitleGraphqlDgsDetailComponent } from '../detail/title-graphql-dgs-detail.component';
import { TitleGraphqlDgsUpdateComponent } from '../update/title-graphql-dgs-update.component';
import { TitleGraphqlDgsRoutingResolveService } from './title-graphql-dgs-routing-resolve.service';

const titleRoute: Routes = [
  {
    path: '',
    component: TitleGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TitleGraphqlDgsDetailComponent,
    resolve: {
      title: TitleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TitleGraphqlDgsUpdateComponent,
    resolve: {
      title: TitleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TitleGraphqlDgsUpdateComponent,
    resolve: {
      title: TitleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(titleRoute)],
  exports: [RouterModule],
})
export class TitleGraphqlDgsRoutingModule {}
