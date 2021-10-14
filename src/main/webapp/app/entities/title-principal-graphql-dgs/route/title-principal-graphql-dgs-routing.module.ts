import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TitlePrincipalGraphqlDgsComponent } from '../list/title-principal-graphql-dgs.component';
import { TitlePrincipalGraphqlDgsDetailComponent } from '../detail/title-principal-graphql-dgs-detail.component';
import { TitlePrincipalGraphqlDgsUpdateComponent } from '../update/title-principal-graphql-dgs-update.component';
import { TitlePrincipalGraphqlDgsRoutingResolveService } from './title-principal-graphql-dgs-routing-resolve.service';

const titlePrincipalRoute: Routes = [
  {
    path: '',
    component: TitlePrincipalGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TitlePrincipalGraphqlDgsDetailComponent,
    resolve: {
      titlePrincipal: TitlePrincipalGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TitlePrincipalGraphqlDgsUpdateComponent,
    resolve: {
      titlePrincipal: TitlePrincipalGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TitlePrincipalGraphqlDgsUpdateComponent,
    resolve: {
      titlePrincipal: TitlePrincipalGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(titlePrincipalRoute)],
  exports: [RouterModule],
})
export class TitlePrincipalGraphqlDgsRoutingModule {}
