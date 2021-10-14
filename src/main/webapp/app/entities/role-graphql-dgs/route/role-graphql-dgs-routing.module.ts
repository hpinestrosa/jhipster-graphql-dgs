import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RoleGraphqlDgsComponent } from '../list/role-graphql-dgs.component';
import { RoleGraphqlDgsDetailComponent } from '../detail/role-graphql-dgs-detail.component';
import { RoleGraphqlDgsUpdateComponent } from '../update/role-graphql-dgs-update.component';
import { RoleGraphqlDgsRoutingResolveService } from './role-graphql-dgs-routing-resolve.service';

const roleRoute: Routes = [
  {
    path: '',
    component: RoleGraphqlDgsComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RoleGraphqlDgsDetailComponent,
    resolve: {
      role: RoleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RoleGraphqlDgsUpdateComponent,
    resolve: {
      role: RoleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RoleGraphqlDgsUpdateComponent,
    resolve: {
      role: RoleGraphqlDgsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(roleRoute)],
  exports: [RouterModule],
})
export class RoleGraphqlDgsRoutingModule {}
