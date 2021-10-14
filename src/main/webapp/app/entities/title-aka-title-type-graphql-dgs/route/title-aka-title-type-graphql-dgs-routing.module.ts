import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TitleAkaTitleTypeGraphqlDgsComponent } from '../list/title-aka-title-type-graphql-dgs.component';
import { TitleAkaTitleTypeGraphqlDgsDetailComponent } from '../detail/title-aka-title-type-graphql-dgs-detail.component';
import { TitleAkaTitleTypeGraphqlDgsUpdateComponent } from '../update/title-aka-title-type-graphql-dgs-update.component';
import { TitleAkaTitleTypeGraphqlDgsRoutingResolveService } from './title-aka-title-type-graphql-dgs-routing-resolve.service';

const titleAkaTitleTypeRoute: Routes = [
  {
    path: '',
    component: TitleAkaTitleTypeGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TitleAkaTitleTypeGraphqlDgsDetailComponent,
    resolve: {
      titleAkaTitleType: TitleAkaTitleTypeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TitleAkaTitleTypeGraphqlDgsUpdateComponent,
    resolve: {
      titleAkaTitleType: TitleAkaTitleTypeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TitleAkaTitleTypeGraphqlDgsUpdateComponent,
    resolve: {
      titleAkaTitleType: TitleAkaTitleTypeGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(titleAkaTitleTypeRoute)],
  exports: [RouterModule],
})
export class TitleAkaTitleTypeGraphqlDgsRoutingModule {}
