import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TitleAkaGraphqlDgsComponent } from '../list/title-aka-graphql-dgs.component';
import { TitleAkaGraphqlDgsDetailComponent } from '../detail/title-aka-graphql-dgs-detail.component';
import { TitleAkaGraphqlDgsUpdateComponent } from '../update/title-aka-graphql-dgs-update.component';
import { TitleAkaGraphqlDgsRoutingResolveService } from './title-aka-graphql-dgs-routing-resolve.service';

const titleAkaRoute: Routes = [
  {
    path: '',
    component: TitleAkaGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TitleAkaGraphqlDgsDetailComponent,
    resolve: {
      titleAka: TitleAkaGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TitleAkaGraphqlDgsUpdateComponent,
    resolve: {
      titleAka: TitleAkaGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TitleAkaGraphqlDgsUpdateComponent,
    resolve: {
      titleAka: TitleAkaGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(titleAkaRoute)],
  exports: [RouterModule],
})
export class TitleAkaGraphqlDgsRoutingModule {}
