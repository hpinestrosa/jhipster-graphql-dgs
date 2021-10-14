import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RegionGraphqlDgsComponent } from '../list/region-graphql-dgs.component';
import { RegionGraphqlDgsDetailComponent } from '../detail/region-graphql-dgs-detail.component';
import { RegionGraphqlDgsUpdateComponent } from '../update/region-graphql-dgs-update.component';
import { RegionGraphqlDgsRoutingResolveService } from './region-graphql-dgs-routing-resolve.service';

const regionRoute: Routes = [
  {
    path: '',
    component: RegionGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegionGraphqlDgsDetailComponent,
    resolve: {
      region: RegionGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegionGraphqlDgsUpdateComponent,
    resolve: {
      region: RegionGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegionGraphqlDgsUpdateComponent,
    resolve: {
      region: RegionGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(regionRoute)],
  exports: [RouterModule],
})
export class RegionGraphqlDgsRoutingModule {}
