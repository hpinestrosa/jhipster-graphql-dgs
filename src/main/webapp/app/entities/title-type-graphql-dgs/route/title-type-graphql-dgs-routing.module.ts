import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TitleTypeGraphqlDgsComponent } from '../list/title-type-graphql-dgs.component';
import { TitleTypeGraphqlDgsDetailComponent } from '../detail/title-type-graphql-dgs-detail.component';
import { TitleTypeGraphqlDgsUpdateComponent } from '../update/title-type-graphql-dgs-update.component';
import { TitleTypeGraphqlDgsRoutingResolveService } from './title-type-graphql-dgs-routing-resolve.service';

const titleTypeRoute: Routes = [
  {
    path: '',
    component: TitleTypeGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TitleTypeGraphqlDgsDetailComponent,
    resolve: {
      titleType: TitleTypeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TitleTypeGraphqlDgsUpdateComponent,
    resolve: {
      titleType: TitleTypeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TitleTypeGraphqlDgsUpdateComponent,
    resolve: {
      titleType: TitleTypeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(titleTypeRoute)],
  exports: [RouterModule],
})
export class TitleTypeGraphqlDgsRoutingModule {}
